import { EventEmitter } from "events";
import type { MemoryVectorStore } from "langchain/vectorstores/memory";

declare const LanguageModel: any;

export const initChatbot = async () => {
    
    const emitter = new EventEmitter();

    const session = await LanguageModel.create({
        monitor(m: any) {
            m.addEventListener("downloadprogress", (e: any) => {
                emitter.emit("progress", e);
            });
        },
        initialPrompts: [
            { role: 'system', content: 'You are a helpful and friendly documentation assistant.' },
        ],
        expectedInputs: [
            { type: "text", languages: ["en"] }
        ],
        expectedOutputs: [
            { type: "text", languages: ["en"] }
        ]
    });

    return { session, emitter };
};

export const chatBot = async (session: any, query: string, vectorStore: MemoryVectorStore) => {

    const results = await vectorStore.similaritySearch(
        query,
        5
    );

    const context = results
        .map(r => r.pageContent) 
        .join("\n\n");      

    const prompt = `
        Use this documentation to answer the question.
        You may add your base knowledge to answer.

        Documentation : ${context}

        Question : ${query}
    `;

    const result = await session.prompt(prompt);

    return result;
}

// use example
// const { session, emitter } = await chatbot();

// emitter.on("progress", (e) => {
//     console.log("Progress dari luar:", e.loaded);
// });
