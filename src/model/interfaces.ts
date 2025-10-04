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