import { useStore } from "../model/zustand";
import ChatBubble from "./common/ChatBubble";
import LiquidGlassContainer from "./common/LiquidGlassContainer";

const ChatRoom: React.FC = () => {

    const { chats } = useStore();

    return (
        <LiquidGlassContainer className="w-full h-200 flex flex-col p-4 overflow-y-auto rounded-4xl">
            <div className="flex-1 space-y-2 text-white/80">
                {chats.map((chat, index) => (
                    <ChatBubble
                        key={index}
                        fromAi={chat.fromAi}
                        content={chat.content}
                    />
                ))}
            </div>
          </LiquidGlassContainer>
    )
}

export default ChatRoom;