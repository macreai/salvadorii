from psycopg2 import sql
from psycopg2.extensions import connection, cursor
from utils.parse import url_to_table_name
from consts.app import create_connection, output_file
from core.chunking import chunking_doc
from core.embedding import embed_doc
import gc

def store_data(conn: connection, cur: cursor, url: str, docs, embedded):
    table_name = url_to_table_name(url)

    create_table_query = sql.SQL("""
        CREATE TABLE IF NOT EXISTS {} (
            id SERIAL PRIMARY KEY,
            text TEXT,
            embedding VECTOR(1024)
        )
    """).format(sql.Identifier(table_name))
    cur.execute(create_table_query)

    insert_query = sql.SQL("""
        INSERT INTO {} (text, embedding) VALUES (%s, %s)
    """).format(sql.Identifier(table_name))

    for text, emb in zip(docs, embedded):
        cur.execute(insert_query, (text, emb.tolist()))

    conn.commit()

    cur.close()
    conn.close()

if __name__ == "__main__":
    conn, cur = create_connection(dbname="salvadorii", user="postgres", password="root", host="localhost", port="5432")
    docs = chunking_doc(output_file=output_file)
    embedded = embed_doc(docs)
    store_data(conn, cur, "https://docs.soliditylang.org/en/v0.8.30/", docs, embedded)
    print("SUCCESS")