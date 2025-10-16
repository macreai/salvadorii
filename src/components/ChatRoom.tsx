import type { ChatRoomProps } from "../model/interfaces";
import ChatBubble from "./common/ChatBubble";
import LiquidGlassContainer from "./common/LiquidGlassContainer";

const ChatRoom: React.FC<ChatRoomProps> = ({ chats, progressState }) => {
    
    return (
        <LiquidGlassContainer className="w-full h-200 flex flex-col p-4 overflow-y-auto rounded-4xl">
            <div className="flex-1 space-y-2 text-white/80">
                <ChatBubble 
                    fromAi={true}
                    content={progressState}
                />
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