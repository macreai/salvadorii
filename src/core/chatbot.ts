// import { GoogleGenAI } from "@google/genai";

// let ai: GoogleGenAI;

// export const chatbot = async (apiKey: string, context: string) => {

//     if (!ai) {
//         ai = new GoogleGenAI({
//             apiKey: apiKey
//         })
//     }

//     const prompt = `
//         Use this context to answer the question.

//         Context : ${context}
//     `;

//     const chat = await ai.chats.create({
//         model: "gemini-2.5-pro",
//         history: [
//             {
//                 role: "user",
//                 parts: [
//                     {
//                         text: prompt
//                     }
//                 ]
//             },
//             {
//                 role: "model",
//                 parts: [
//                     {
//                         text: "I understand!"
//                     }
//                 ]
//             }
//         ]
//     });

//     return chat;
// }
declare const LanguageModel: any; 

export const chatbot = async () => {
    const session = await LanguageModel.create({
        monitor(m: any) {
            m.addEventListener("downloadprogress", (e: any) => {
            console.log(`Downloaded ${e.loaded * 100}%`);
            });
        },
    });

    return session
}