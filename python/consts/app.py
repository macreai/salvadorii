from docling.document_converter import DocumentConverter
from pathlib import Path
from FlagEmbedding import BGEM3FlagModel
import psycopg2

converter = DocumentConverter()

output_file = Path("output.md")

embedding_model = BGEM3FlagModel('BAAI/bge-m3',  use_fp16=True)

def create_connection(dbname: str, user: str, password: str, host: str, port: str):
    conn = psycopg2.connect(
        dbname=dbname,
        user=user,
        password=password,
        host=host,
        port=port
    )
    cur = conn.cursor()

    cur.execute("""
        CREATE EXTENSION IF NOT EXISTS vector;
                """)
    conn.commit()

    print("SUCCESS CONNECT")

    return conn, cur

