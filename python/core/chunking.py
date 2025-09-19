from docling_core.transforms.chunker.tokenizer.huggingface import HuggingFaceTokenizer
from transformers import AutoTokenizer
from docling.chunking import HybridChunker
from consts.app import converter, output_file

def chunking_doc(output_file):

    EMBED_MODEL_ID = "sentence-transformers/all-MiniLM-L6-v2"
    MAX_TOKENS = 64

    tokenizer = HuggingFaceTokenizer(
        tokenizer=AutoTokenizer.from_pretrained(EMBED_MODEL_ID),
        max_tokens=MAX_TOKENS
    )

    chunker = HybridChunker(
        tokenizer=tokenizer,
        merge_peers=True,
    )

    chunk_iter = chunker.chunk(dl_doc=converter.convert(source=output_file).document)
    chunked_doc = []

    for chunk in chunk_iter:

        enriched_text = chunker.contextualize(chunk=chunk)
        chunked_doc.append(enriched_text)

    return chunked_doc

if __name__ == "__main__":
    docs = chunking_doc(output_file=output_file)
    print(f"Total chunks: {len(docs)}")
    print(docs[0][:300], "…")


