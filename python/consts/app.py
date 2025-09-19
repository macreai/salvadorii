from docling.document_converter import DocumentConverter
from pathlib import Path
from docling.chunking import HybridChunker
from FlagEmbedding import BGEM3FlagModel

converter = DocumentConverter()

output_file = Path("output.md")

chunker = HybridChunker()

embedding_model = BGEM3FlagModel('BAAI/bge-m3',  use_fp16=True)