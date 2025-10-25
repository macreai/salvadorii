import { motion, AnimatePresence } from "framer-motion";
import type { IconUrlProps } from "../model/interfaces";
import LiquidGlassContainer from "./common/LiquidGlassContainer";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { storage } from "../model/storage";

const IconUrl: React.FC<IconUrlProps> = ({ url, emoji, progressState, setUrl }) => {

  const [open, setOpen] = useState(false);

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

        <LiquidGlassContainer className="flex-1 h-30 px-3 text-white rounded-4xl flex items-center justify-center"
          title={url}
        >
          <span className="block truncate max-w-[70%]">{url}</span>
        </LiquidGlassContainer>
      </div>
      <div className="relative inline-block">
        <LiquidGlassContainer className="h-2 rounded-4xl flex items-center justify-center">
          <div className="flex items-center gap-2">
            <span>{progressState}</span>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="text-white/70 hover:text-white transition p-1 rounded-md"
            >
              {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </LiquidGlassContainer>

        {open && (
          <div className="absolute left-1/2 -translate-x-1/2 mt-2 z-100 w-56">
            <LiquidGlassContainer className="hover:cursor-pointer hover:bg-white/10 transition"
              onClick={() => {
                setUrl();
                setOpen(false);
                }
              }
            >
              Get Current Document
            </LiquidGlassContainer>
            <LiquidGlassContainer className="mt-2 hover:cursor-pointer hover:bg-white/10 transition"
              onClick={async () => {
                await storage.clear();
                alert('Database deleted Successfully');
                setOpen(false);
              }
            }
            >
              Clear Data
            </LiquidGlassContainer>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default IconUrl;
