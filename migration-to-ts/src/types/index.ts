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

export interface resData {
    status: string;
}

export interface newsData extends resData {
    articles: articlesData;
    totalResults: number;
}

export interface sourceData extends resData {
    sources: sources;
}

export interface IView {
    news: object;
    sources: object;
}
