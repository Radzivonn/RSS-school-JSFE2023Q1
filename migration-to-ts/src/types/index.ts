type sourceItem = {
    id: string;
    name: string;
};

type articleItem = {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: sourceItem;
    title: string;
    url: string;
    urlToImage: string;
};

export type articlesData = Array<articleItem>;

export type sources = Array<sourceItem>;

interface respData {
    status: string;
}

export interface newsData extends respData {
    articles: articlesData;
    totalResults: number;
}

export interface sourceData extends respData {
    sources: sources;
}

export interface IView {
    news: object;
    sources: object;
}

export interface ILoader {
    baseLink: string;
    options: loaderOptions;
}

export type loaderOptions = {
    apiKey: string;
};

export type respOptions = {
    sources?: string;
};

export type requestOptions = {
    endpoint: string;
    options?: respOptions;
};

export interface urlOptions extends loaderOptions, respOptions {
    [key: string]: string | undefined;
}

export interface ICallback {
    (data?: sourceData): void;
}
