import { IView } from './types';
import { ConfigElement } from '@/utils/levelTypes';
import { createElement } from '@/utils/helperFuncs';

export class LayoutExampleView implements IView {
	public root: HTMLElement;
	
	constructor(root: HTMLElement) {
		this.root = root;
	}

	public updateView(elements: Array<ConfigElement>): void {
		this.root.replaceChildren(...this.getMarkupTree(elements));
	}

	private getMarkupTree(elements: Array<ConfigElement>): Array<HTMLElement> {
		const nodesTree: Array<HTMLElement> = []; 
		elements.forEach(element =>	nodesTree.push(this.createElementByConfig(element)));
		return nodesTree;
	}

	private createElementByConfig(element: ConfigElement): HTMLElement {
		const node = createElement({ tag: element.tag, classNames: element.className ? [element.className] : [] });
		if (element.child) node.append(this.createElementByConfig(element.child));
		return node;
	}
}