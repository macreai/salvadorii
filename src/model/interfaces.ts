import type { RefObject } from "react";

export interface LiquidGlassContainerProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
}

export interface ChatBubbleProps {
  content: string;
  fromAi: boolean;
}

export interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export interface UserInputProps {
  inputRef: RefObject<HTMLInputElement | null>;
  input: string;
  setInput: (value: string) => void;
  queryPrompt: (query: string) => void;
  addToChats: (msg: { fromAi: boolean; content: string }) => void;
}

export interface ChatRoomProps {
  chats: ChatBubbleProps[]
  progressState: string
}

export interface IconUrlProps {
  url: string
  emoji: string
}