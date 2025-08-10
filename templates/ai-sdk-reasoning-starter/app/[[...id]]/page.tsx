'use client'

import { Chat } from "@/components/chat";
import { decodeData } from "@/lib/encoding";
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams<{ id: string }>();
  const encodedId = params.id;
  let presetData = null;

  if (encodedId) {
    try {
      presetData = decodeData(encodedId);
    } catch (error) {
      console.error("Failed to decode preset:", error);
    }
  }

  return (
    <div className="flex flex-col size-full items-center">
      <Chat
        modelName={presetData?.modelName}
        headingText={presetData?.headingText}
        descriptionText={presetData?.descriptionText}
      />
    </div>
  );
}
