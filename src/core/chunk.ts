import type { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize : 1000,
    chunkOverlap : 100,
    separators: ["\n"],
    keepSeparator: true
});

export const chunk = async (document: Document<Record<string, any>>[]) => {

    const texts = await textSplitter.splitDocuments(document);

    return texts;
}
