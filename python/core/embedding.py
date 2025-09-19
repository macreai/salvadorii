from core.chunking import chunking_doc
from consts.app import embedding_model, output_file

def embed_doc(chunked_doc):

    embedding = embedding_model.encode(chunked_doc)['dense_vecs']

    return embedding

if __name__ == "__main__":
    docs = chunking_doc(output_file=output_file)
    embedded = embed_doc(docs)
    print("Embedding[0]:", embedded[0])
    print("Length of vector:", len(embedded[0]))
