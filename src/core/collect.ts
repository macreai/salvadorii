import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";

export const collect = async (url: string) => {

    const loader = new CheerioWebBaseLoader(
        url,
        {
            selector: 'p, pre, code, h1, h2, h3, h4, h5, h6'
        }
    );

    return loader;
}