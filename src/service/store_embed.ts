import { pipeline, env, type ProgressCallback } from "@huggingface/transformers";
import type { EmbeddingsInterface } from "@langchain/core/embeddings";
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { useStore } from "../model/zustand";

env.useBrowserCache = true;
env.cacheDir = "";
env.allowRemoteModels = false;
env.allowLocalModels = true;
env.localModelPath = "/transformers/";
env.backends.onnx.preferredBackend = "wasm";
env.backends.onnx.wasm!.wasmPaths = chrome.runtime.getURL("onnxruntime/");
env.backends.onnx.wasm!.numThreads = 1;

export let extractor: any | null = null;

const { setProgressState } = useStore.getState();

const progressCallback: ProgressCallback = (progressInfo) => {
    
    switch (progressInfo.status) {
        case 'initiate':
        console.log(`[INIT] Starting download: ${progressInfo.file}`);
        setProgressState("initiate");
        break;
        case 'progress':
        console.log(`[DOWNLOAD] ${progressInfo.file}: ${Math.round(progressInfo.progress * 100)}%`);
        setProgressState("progress");
        break;
        case 'done':
        console.log(`[DONE] ${progressInfo.file} downloaded`);
        setProgressState("done");
        break;
        case 'ready':
        console.log(`[READY] Pipeline is ready`);
        setProgressState("ready");
        break;
    }
};

class HFEmbeddings implements EmbeddingsInterface {
    private extractor: any;

    constructor(extractor: any) {
        this.extractor = extractor;
    }

    async embedDocuments(texts: string[]): Promise<number[][]> {
        const results: number[][] = [];
        for (const text of texts) {
        const output = await this.extractor(text, { pooling: "mean", normalize: true });
        results.push(Array.from(output.data));
        }
        return results;
    }

    async embedQuery(text: string): Promise<number[]> {
        const output = await this.extractor(text, { pooling: "mean", normalize: true });
        return Array.from(output.data);
    }
}

export const store = async (chunks: string[]) => {
    if (!extractor) {
        console.log("[EXT] Model not loaded, loading...");
        setProgressState("Model not loaded, loading...");
        extractor = await pipeline("feature-extraction", "Xenova/bge-base-en-v1.5", {
            device: "wasm",
            dtype: "auto",
            progress_callback: progressCallback,
        });
        console.log("[EXT] Model ready");
        setProgressState("Model Ready");
    }

    const embeddings = new HFEmbeddings(extractor);

    const vectorStore = await MemoryVectorStore.fromTexts(
        chunks,
        Array(chunks.length).fill({}),
        embeddings
    );

    return vectorStore;
};
