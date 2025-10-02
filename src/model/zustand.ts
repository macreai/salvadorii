import { create } from 'zustand'
import { EventEmitter } from "events";
import { chatBot } from '../core/chatbot'

type Store = {
  url: string
  setUrl: () => void
  result?: string
  emitter?: EventEmitter
}

export const useStore = create<Store>()((set) => ({
    url: "",
    setUrl: () => {
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            const activeTab = tabs[0];
            if (activeTab.url) {
                set({ url: activeTab.url })
                const { result, emitter } = await chatBot(activeTab.url, "What is Principal?");
                set({ result, emitter });
            }
        });
    },
    result: "",
    emitter: new EventEmitter()
}))