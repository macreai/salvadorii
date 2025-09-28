type BubbleChatProps = {
  message: string;
  sender?: "user" | "ai";
};

export const BubbleChat = ({ message, sender = "ai" }: BubbleChatProps) => {
  return (
    <div
      className={`flex w-full mb-2 ${
        sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
          sender === "user"
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-300 text-black rounded-bl-none"
        }`}
      >
        {message}
      </div>
    </div>
  );
};
