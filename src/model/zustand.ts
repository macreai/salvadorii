import { create } from 'zustand'
import { EventEmitter } from "events";
import { chatBot, initChatbot } from '../core/chatbot'
import { rag } from '../core/rag';
import type { MemoryVectorStore } from 'langchain/vectorstores/memory';
import type { ChatBubbleProps } from './interfaces';

type Store = {
    url: string
    result: string
    progress: number
    chats: ChatBubbleProps[]

    setUrl: () => void
    queryPrompt: (query: string) => void
    addToChats: (chat: ChatBubbleProps) => void;
}

let session: any = null;  
let emitter: EventEmitter | null = null;
let vectorStore: MemoryVectorStore

export const useStore = create<Store>()((set, get) => ({
    url: "",
    result: "",
    progress: 0,
    chats: [],

    setUrl: () => {
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            const activeTab = tabs[0];
            if (activeTab.url) {
                set({ url: activeTab.url })
            }

            const { session: s, emitter: em } = await initChatbot();
            session = s;
            emitter = em;

            emitter.on("progress", (e: any) => {
                const loaded = e.loaded ?? e.detail?.loaded ?? 0;
                const total = e.total ?? e.detail?.total ?? 1;
                const percent = Math.round((loaded / total) * 100);
                set({ progress: percent });
            });

            const vs = await rag(get().url);
            vectorStore = vs;
        });
    },

    queryPrompt: async (query: string) => {
        if (!session) return;
        const result = await chatBot(session, query, vectorStore);
        set({ result });
    },

    addToChats: (chat) =>
        set((state) => ({
            chats: chat ? [...state.chats, chat] : state.chats,
        })),

}));
