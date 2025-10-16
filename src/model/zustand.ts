import { create } from 'zustand'
import type { ChatBubbleProps } from './interfaces';

type Store = {
    url: string
    progress: number
    chats: ChatBubbleProps[]
    progressState: string
    thinking: boolean

    setUrl: () => void
    addToChats: (chat: ChatBubbleProps) => void;
    setProgressState: (progressState: string) => void
    setThinking: (isThinking: boolean) => void
}

export const useStore = create<Store>()((set) => ({
    url: "",
    progress: 0,
    chats: [],
    progressState: "",
    thinking: false,

    setUrl: () => {
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            const activeTab = tabs[0];
            if (activeTab.url) {
                set({ url: activeTab.url })
            }
        });
    },

    addToChats: (chat) => set((state) => ({ chats: chat ? [...state.chats, chat] : state.chats,})),

    setProgressState: (progressState: string) => {
        set({ progressState: progressState});
    },

    setThinking: (isThinking) => { // not yet implemented
        set({ thinking: isThinking })
    }

}));
