from consts.app import converter, output_file
from utils.get_urls import get_urls

def convert_doc(url):

    sitemap_urls = get_urls(url)
    conv_result_iter = converter.convert_all(sitemap_urls)

    docs = []
    for result in conv_result_iter:
        if result.document:
            document = result.document
            docs.append(document)

    texts = [doc.export_to_markdown() for doc in docs]

    return texts

if __name__ == "__main__":
    md_texts = convert_doc("https://docs.soliditylang.org/en/v0.8.30/")

    with output_file.open("w", encoding="utf-8") as f:
        for i, md in enumerate(md_texts, 1):
            f.write(f"\n\n---\n# 📄 Document {i}\n---\n\n")
            f.write(md + "\n")

    print(f"Saved: {output_file.resolve()}")