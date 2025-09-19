import requests
import xml.etree.ElementTree as ET
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup


def _filter_urls(urls: list[str]) -> list[str]:
    """Keep only URLs with allowed extensions (HTML, PDF, DOCX, etc.)."""
    allowed_ext = (".html", ".htm", ".pdf", ".docx", ".pptx", ".txt", ".md", "/")
    filtered = []
    for u in urls:
        path = urlparse(u).path.lower()
        if path.endswith(allowed_ext) or path == "":
            filtered.append(u)
    return list(sorted(set(filtered)))


def get_urls(base_url: str, sitemap_filename: str = "sitemap.xml") -> list[str]:
    """Get all URLs from sitemap.xml if available,
    otherwise crawl <a href> from base page.
    Always returns filtered URLs (docling-compatible)."""

    urls = []
    sitemap_url = urljoin(base_url, sitemap_filename)

    try:
        response = requests.get(sitemap_url, timeout=10)

        if response.status_code == 404:
            raise FileNotFoundError("sitemap.xml not found")

        response.raise_for_status()

        root = ET.fromstring(response.content)
        ns = {"ns": root.tag.split("}")[0].strip("{")} if "}" in root.tag else {}

        urls = [elem.text for elem in root.findall(".//ns:loc", ns)] if ns else [
            elem.text for elem in root.findall(".//loc")
        ]

        if urls:
            return _filter_urls(urls)

    except Exception:
        resp = requests.get(base_url, timeout=10)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")

        urls = set()
        for a in soup.find_all("a", href=True):
            href = a["href"]
            full_url = urljoin(base_url, href)
            if full_url.startswith(base_url):
                urls.add(full_url)

        return _filter_urls(list(urls))
