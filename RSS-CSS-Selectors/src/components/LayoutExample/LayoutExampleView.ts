import { IView } from './types';
import { ConfigElement } from '@/utils/levels/levelTypes';
import { createElement } from '@/utils/helperFuncs';

export class LayoutExampleView implements IView {
	public root: HTMLElement;
	public exampleObjects: Array<HTMLElement> = [];

	constructor(root: HTMLElement) {
		this.root = root;
	}

	public updateView(elements: Array<ConfigElement>): void {
		this.exampleObjects = this.getMarkupTree(elements);
		this.root.replaceChildren(...this.exampleObjects);
	}

	private getMarkupTree(elements: Array<ConfigElement>): Array<HTMLElement> {
		const nodesTree: Array<HTMLElement> = []; 
		elements.forEach((element, index) =>	nodesTree.push(this.createExampleElement(element, index)));
		return nodesTree;
	}

	/* recursion function */
	private createExampleElement(element: ConfigElement, uniqueNumber: number): HTMLElement {
		const nodeClassNames = element.className ? [element.className, 'exampleObject'] : ['exampleObject'];
		const node = createElement({
			tag: element.tag, classNames: nodeClassNames, id: element.id
		});
		if (typeof uniqueNumber === 'number') node.setAttribute('number', `${uniqueNumber}`);
		if(element.isCorrectAnswer) node.classList.add('animated-item');
		if (element.child) node.append(this.createExampleElement(element.child, uniqueNumber + 10));
		return node;
	}
	
}