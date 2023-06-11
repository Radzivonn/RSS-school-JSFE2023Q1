import './sources.css';
import { ISources, sources } from '../../../types/index';

class Sources implements ISources {
    public draw(data: sources): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = <HTMLTemplateElement>document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = <DocumentFragment>sourceItemTemp.content.cloneNode(true);

            (<Element>sourceClone.querySelector('.source__item-name')).textContent = item.name;
            sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        (<Element>document.querySelector('.sources')).append(fragment);
    }
}

export default Sources;
