import { useEffect, useRef, useState } from "react";
import { chatBot, initChatbot } from "./service/chatbot";
import { rag } from "./service/rag";
import { useStore } from "./model/zustand";

export const useApp = () => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [session, setSession] = useState<any>(null);
  const [vs, setVs] = useState<any>(null);
  const [emoji, setEmoji] = useState<string>("");

  const { setUrl, url, addToChats, chats, progressState } = useStore();

  useEffect(() => {
    const init = async () => {
      const vsInstance = await rag(url);
      setVs(vsInstance);
    };

    init();
  }, [url]);

  const queryPrompt = async (query: string) => {
    if (!session || !vs) return;
    const output = await chatBot(session, query, vs);
    addToChats({ fromAi: true, content: output });
  };

  useEffect(() => {
    const init = async () => {
      setUrl();
      const { session, emitter } = await initChatbot();
      setSession(session);

      emitter.on("progress", (e: any) => {
        const loaded = e.loaded ?? e.detail?.loaded ?? 0;
        const total = e.total ?? e.detail?.total ?? 1;
        const percent = Math.round((loaded / total) * 100);
        setProgress(percent);
      });
    };

    init();
  }, []);

  useEffect(() => {
    const lastChat = chats[chats.length - 1];

    if (lastChat && lastChat.fromAi === false) {
      setEmoji('/thinking.png');
    } else if (lastChat && lastChat.fromAi === true) {
      setEmoji('/answer.png');
    } else if (progressState === "I am Ready!") {
      setEmoji('/logo.png');
    } else {
      setEmoji('/initiate.png');
    }
    
  }, [progressState, chats]);



  return { input, setInput, inputRef, queryPrompt, progress, addToChats, chats, progressState, url, emoji };
};
