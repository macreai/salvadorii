import { create } from 'zustand'
import { rag } from '../core'
import type { Chat } from '@google/genai'

type Store = {
  url: string
  setUrl: () => void
  chat?: Chat
  question: (question: string) => Promise<string | undefined>
}

export const useStore = create<Store>()((set, get) => ({
    url: "",
    setUrl: () => {
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            const activeTab = tabs[0];
            if (activeTab.url) {
                set({ url: activeTab.url })
                const chatResult = await rag(activeTab.url, "What is Principal?");
                set({ chat: chatResult });
            }
        });
    },
    question: async (question: string) => {
        const chat = get().chat;
        if (!chat) return undefined;

        const response = await chat.sendMessage({ message: question });
        return response?.text
    }

}))