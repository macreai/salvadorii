import { EventEmitter } from "events";
import { rag } from "./rag";

declare const LanguageModel: any;

const initChatbot = async () => {
    const emitter = new EventEmitter();

    const session = await LanguageModel.create({
        monitor(m: any) {
            m.addEventListener("downloadprogress", (e: any) => {
                emitter.emit("progress", e);
            });
        },
        initialPrompts: [
            { role: 'system', content: 'You are a helpful and friendly documentation assistant.' },
        ]
    });

    return { session, emitter };
};

export const chatBot = async (url: string, query: string) => {

    const { session, emitter } = await initChatbot();

    const context = await rag(url, query);

    const prompt = `
        Use this context to answer the question.
        If you are not sure, just say "I do not know"

        Context : ${context}

        Question : ${query}
    `;

    const result = await session.prompt(prompt);

    return { result, emitter };
}
// use example
// const { session, emitter } = await chatbot();

// emitter.on("progress", (e) => {
//     console.log("Progress dari luar:", e.loaded);
// });
