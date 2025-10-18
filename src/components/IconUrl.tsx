import { motion, AnimatePresence } from "framer-motion";
import type { IconUrlProps } from "../model/interfaces";
import LiquidGlassContainer from "./common/LiquidGlassContainer";

const IconUrl: React.FC<IconUrlProps> = ({ url, emoji }) => {
  return (
    <div className="flex flex-col gap-4 mb-4 max-w-lg mx-auto">
      <div className="flex items-center gap-3 w-full">
        <LiquidGlassContainer className="flex items-center justify-center w-30 h-30 rounded-4xl">
          <AnimatePresence mode="wait">
            <motion.img
              key={emoji}
              src={emoji}
              alt="Logo"
              className="w-30 h-30 object-contain"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </AnimatePresence>
        </LiquidGlassContainer>

        <LiquidGlassContainer className="flex-1 h-30 px-3 text-white rounded-4xl flex items-center">
          <span className="truncate whitespace-nowrap">{url}</span>
        </LiquidGlassContainer>
      </div>
    </div>
  );
};

export default IconUrl;
