import './news.css';
import { INews, articlesData } from '../../../types/index';

class News implements INews {
    public draw(data: articlesData): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp = <HTMLTemplateElement>document.querySelector('#newsItemTemp');

        news.forEach((item, idx) => {
            const newsClone = <DocumentFragment>newsItemTemp.content.cloneNode(true);
            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            (<HTMLElement>newsClone.querySelector('.news__meta-photo')).style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.webp'
            })`;
            (<Element>newsClone.querySelector('.news__meta-author')).textContent = item.author || item.source.name;
            (<Element>newsClone.querySelector('.news__meta-date')).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            (<Element>newsClone.querySelector('.news__description-title')).textContent = item.title;
            (<Element>newsClone.querySelector('.news__description-source')).textContent = item.source.name;
            (<Element>newsClone.querySelector('.news__description-content')).textContent = item.description;
            newsClone.querySelector('.news__read-more a')?.setAttribute('href', item.url);
            fragment.append(newsClone);
        });

        const newsNode = <Element>document.querySelector('.news');
        newsNode.innerHTML = '';
        newsNode.appendChild(fragment);
    }
}

export default News;
