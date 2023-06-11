export enum StatusCodes {
    UNAUTHORIZED = 401,
    NOTFOUND = 404,
}

export interface INews {
    draw(data: articlesData): void;
}

export interface ISources {
    draw(data: sources): void;
}

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
    drawNews(data: newsData): void;
    drawSources(data: sourceData): void;
}

export interface ILoader {
    baseLink: string;
    options: loaderOptions;
    getResp(reqOptions: requestOptions, callback: CallbackType<newsData | sourceData>): void;
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

type CallbackType<T> = (data: T) => void;

export type newsCallback = CallbackType<newsData>;
export type sourcesCallback = CallbackType<sourceData>;
export type respCallback = newsCallback | sourcesCallback;

export interface IAppController {
    getSources(callback: sourcesCallback): void;
    getNews(e: Event, callback: newsCallback): void;
}

export interface IApp {
    controller: IAppController;
    view: object;
    start(): void;
}
