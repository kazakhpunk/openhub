"use client";

import cn from "classnames";
import { toast } from "sonner";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { Messages } from "./messages";
import { modelID } from "@/lib/models";
import { Footnote } from "./footnote";
import {
  ArrowUpIcon,
  CheckedSquare,
  StopIcon,
  UncheckedSquare,
  ShareIcon,
  QuestionIcon,
} from "./icons";
import { Input } from "./input";
import { encodeData } from "@/lib/encoding";

interface ChatProps {
  modelName?: string;
  headingText?: string;
  descriptionText?: string;
}

export function Chat({ modelName, headingText, descriptionText }: ChatProps) {
  const [input, setInput] = useState<string>("");
  const [selectedModelId, setSelectedModelId] = useState<modelID>(
    (modelName as modelID) || "openai/gpt-5-mini",
  );
  const [isReasoningEnabled, setIsReasoningEnabled] = useState<boolean>(true);
  // Model picking removed from chat site; keep a fixed default model id

  const { messages, sendMessage, status, stop } = useChat({
    id: "primary",
    onError: () => {
      toast.error("An error occurred, please try again!");
    },
  });

  console.log(messages);

  const isGeneratingResponse = ["streaming", "submitted"].includes(status);

  return (
    <div
      className={cn(
        "px-4 md:px-0 pb-4 pt-8 flex flex-col h-dvh items-center w-full max-w-3xl",
        {
          "justify-between": messages.length > 0,
          "justify-center gap-4": messages.length === 0,
        },
      )}
    >
      {messages.length > 0 ? (
        <Messages messages={messages} status={status} />
      ) : (
        <div className="flex flex-col gap-0.5 sm:text-2xl text-xl w-full">
          <div className="flex flex-row gap-2 items-center">
            <div>
              {headingText || "Welcome to the AI SDK Reasoning Preview."}
            </div>
          </div>
          <div className="dark:text-zinc-500 text-zinc-400">
            {descriptionText || "What would you like me to think about today?"}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 w-full">
        <div className="flex relative flex-col gap-1 p-3 w-full rounded-2xl dark:bg-zinc-800 bg-zinc-100">
          <div className="absolute -top-6 right-0 text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
            <div className="group relative inline-flex items-center">
              <QuestionIcon />
              <div className="absolute z-10 left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-700 dark:text-zinc-300 rounded-md px-2 py-1 whitespace-nowrap shadow-md">
                <span>Model: </span>
                <span className="font-medium">{selectedModelId}</span>
              </div>
            </div>
          </div>
          <Input
            input={input}
            setInput={setInput}
            selectedModelId={selectedModelId}
            isGeneratingResponse={isGeneratingResponse}
            isReasoningEnabled={isReasoningEnabled}
            onSubmit={() => {
              if (input === "") {
                return;
              }
              sendMessage(
                { text: input },
                {
                  body: {
                    selectedModelId,
                    isReasoningEnabled,
                  },
                }
              );
              setInput("");
            }}
          />

          <div className="absolute bottom-2.5 left-2.5">
            <button
              className={cn(
                "relative w-fit text-sm p-1.5 rounded-lg flex flex-row items-center gap-2 dark:hover:bg-zinc-600 hover:bg-zinc-200 cursor-pointer disabled:opacity-50",
                {
                  "dark:bg-zinc-600 bg-zinc-200": isReasoningEnabled,
                },
              )}
              onClick={() => {
                setIsReasoningEnabled(!isReasoningEnabled);
              }}
            >
              {isReasoningEnabled ? <CheckedSquare /> : <UncheckedSquare />}
              <div>Reasoning</div>
            </button>
          </div>

          <div className="absolute bottom-2.5 right-2.5 flex flex-row gap-2">
            <button
              className="relative w-fit text-sm p-1.5 rounded-lg flex flex-row items-center gap-2 dark:hover:bg-zinc-700 hover:bg-zinc-200 cursor-pointer"
              onClick={() => {
                const heading =
                  headingText || "Welcome to the AI SDK Reasoning Preview.";
                const description =
                  descriptionText ||
                  "What would you like me to think about today?";
                const encoded = encodeData(
                  selectedModelId,
                  heading,
                  description,
                );
                const url = new URL(window.location.href);
                url.pathname = `/${encoded}`;
                navigator.clipboard.writeText(url.toString());
                console.log(url.toString());
                toast.success("Shareable URL copied to clipboard!");
              }}
            >
              <ShareIcon />
            </button>
            {/* Model selector removed */}

            <button
              className={cn(
                "size-8 flex flex-row justify-center items-center dark:bg-zinc-100 bg-zinc-900 dark:text-zinc-900 text-zinc-100 p-1.5 rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-300 hover:scale-105 active:scale-95 transition-all",
                {
                  "dark:bg-zinc-200 dark:text-zinc-500":
                    isGeneratingResponse || input === "",
                },
              )}
              onClick={() => {
                if (input === "") {
                  return;
                }

                if (isGeneratingResponse) {
                  stop();
                } else {
                  sendMessage(
                    { text: input },
                    {
                      body: {
                        selectedModelId,
                        isReasoningEnabled,
                      },
                    }
                  );
                }

                setInput("");
              }}
            >
              {isGeneratingResponse ? <StopIcon /> : <ArrowUpIcon />}
            </button>
          </div>
        </div>

        <Footnote />
      </div>
    </div>
  );
}
