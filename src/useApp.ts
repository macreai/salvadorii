import { useEffect, useRef, useState } from "react";
import { chatBot, initChatbot } from "./service/chatbot";
import { rag } from "./service/rag";
import { useStore } from "./model/zustand";

export const useApp = () => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);

  const { setUrl, url, addToChats } = useStore();

  const [session, setSession] = useState<any>(null);
  const [vs, setVs] = useState<any>(null);

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

  return { input, setInput, inputRef, queryPrompt, progress };
};
