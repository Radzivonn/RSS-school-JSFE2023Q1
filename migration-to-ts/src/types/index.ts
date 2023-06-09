type sourceType = {
    id: string;
    name: string;
};

type newsItem = {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: sourceType;
    title: string;
    url: string;
    urlToImage: string;
};

export type newsData = Array<newsItem>;

export interface INews {
    draw(data: newsData): void;
}
