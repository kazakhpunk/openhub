import { Chat } from "@/components/chat";
import { decodeData } from "@/lib/encoding";

interface HomeProps {
  params: {
    id?: string[];
  };
}

export default function Home({ params }: HomeProps) {
  const encodedId = params.id?.[0];
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
