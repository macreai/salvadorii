import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { storage } from "../model/storage";
import { chunk } from "./chunk";
import { collect } from "./collect";
import { store } from "./store_embed";

export const rag = async (url: string, query: string) => {

    let vectorStore: MemoryVectorStore
    let texts: string[]

    const cached = await storage.getItem(url);

    if (cached) {

        texts = cached;

    } else {

        const docs = await (await collect(url)).load();

        const chunked = chunk(docs);

        texts = (await chunked).map(c => c.pageContent)
        
        await storage.setItem(url, texts)
    }

    vectorStore = await store(texts);
    
    const results = await vectorStore.similaritySearch(
        query,
        5
    );

    const combinedText = results
        .map(r => r.pageContent) 
        .join("\n\n");           

    return combinedText;

};
