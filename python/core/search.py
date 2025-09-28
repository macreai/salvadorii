import psycopg2
from psycopg2 import sql
from psycopg2.extensions import connection, cursor
from consts.app import embedding_model
from utils.parse import url_to_table_name


def embed_query(query: str):
    """Convert query string ke embedding vector"""
    return embedding_model.encode([query])["dense_vecs"][0].tolist()

def search(conn: connection, cur: cursor, url: str, query: str, top_k: int = 5):
    """Cari chunk paling relevan dari DB"""
    table_name = url_to_table_name(url)
    query_emb = embed_query(query)

    search_query = sql.SQL("""
        SELECT id, text
        FROM {}
        ORDER BY embedding <-> %s::vector
        LIMIT %s
    """).format(sql.Identifier(table_name))

    cur.execute(search_query, (query_emb, top_k))
    return cur.fetchall()

if __name__ == "__main__":
    conn = psycopg2.connect(
        dbname="salvadorii",
        user="postgres",
        password="root",
        host="localhost",
        port="5432"
    )
    cur = conn.cursor()

    results = search(conn, cur,
                     "https://docs.soliditylang.org/en/v0.8.30/",
                     query="how to declare a smart contract in solidity?",
                     top_k=5)

    with open("search_results.txt", "w", encoding="utf-8") as f:
        for row in results:
            f.write(f"[ID {row[0]}]\n{row[1]}\n{'-'*80}\n")

    print("✅ Full search results saved to search_results.txt")

    cur.close()
    conn.close()

