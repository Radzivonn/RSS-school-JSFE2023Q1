import News from './news/news';
import Sources from './sources/sources';
import { articlesData, newsData, sourceData, IView } from '../../types/index';

export class AppView implements IView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: newsData): void {
        console.log(data);
        const values: articlesData = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: sourceData) {
        console.log(data);
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
