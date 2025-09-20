import re

def url_to_table_name(url: str) -> str:
    name = re.sub(r"^https?://", "", url)
    name = re.sub(r"[^0-9a-zA-Z_]", "_", name)
    return name.lower()
