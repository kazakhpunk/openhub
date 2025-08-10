import { modelID } from "@/lib/models";
import { convertToModelMessages, smoothStream, streamText, UIMessage } from "ai";
import { NextRequest } from "next/server";
import { openrouter } from "@/lib/models";

export async function POST(request: NextRequest) {
  const {
    messages,
    selectedModelId,
    isReasoningEnabled,
  }: {
    messages: Array<UIMessage>;
    selectedModelId: modelID;
    isReasoningEnabled: boolean;
  } = await request.json();

  const stream = streamText({
    system: "You are an AI assistant created by Anthropic.",
    model: openrouter("openai/gpt-5-mini"),
    providerOptions: {
      openai: {
        reasoningEffort: "low",
      },
    },
    experimental_transform: [
      smoothStream({
        chunking: "word",
      }),
    ],
    messages: convertToModelMessages(messages),
  });

  return stream.toUIMessageStreamResponse({
    sendReasoning: true,
    onError: () => {
      return `An error occurred, please try again!`;
    },
  });
}
