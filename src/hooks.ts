import { useEffect, useRef, useState } from "react";
import { useStore } from "./model/zustand";

export const appHooks = () => {

    const [input, setInput] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    const { setUrl, result, addToChats } = useStore();
    
    useEffect(() => {
        setUrl();
    }, []);

    useEffect(() => {
        if (result.trim()) {
            addToChats({ fromAi: true, content: result });
        }
    }, [result]);


    return { input, setInput, inputRef };
}