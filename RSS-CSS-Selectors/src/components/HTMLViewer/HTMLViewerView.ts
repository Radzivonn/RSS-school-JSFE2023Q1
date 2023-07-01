import { IView } from "./types";
import { ConfigElement } from "@/utils/levelTypes";
import { createElement } from "@/utils/helperFuncs";

export default class HTMLViewerView implements IView {
	root: HTMLElement;
	constructor(root: HTMLElement) {
		this.root = root;
	}

	public updateView(elements: Array<ConfigElement>): void {
		this.root.replaceChildren(
			createElement({	tag: 'pre', text: `<div class="table">\n` }),
			...this.getMarkupElements(elements),
			createElement({	tag: 'pre', text: `</div>\n` }),
		);
	}

	private getMarkupElements(elements: Array<ConfigElement>): Array<HTMLElement> {
		return elements.reduce((arr: Array<HTMLElement>, element) => {
			arr.push(this.createMarkupElement(element));
			return arr;
		}, []);
	}

	private createMarkupElement(element: ConfigElement): HTMLElement {
		const node = createElement({ tag: 'div', classNames: ['html__markup-code'] });
		node.append(createElement({
			tag: 'pre',
			text: `<${element.tag}${element.className ? ` class=${element.className}` : ''}${element.child ? '' : '/'}>\n`
		}));
		if (element.child) {
			node.append(this.createMarkupElement(element.child));
			node.append(createElement({ tag: 'pre', text: `</${element.tag}>\n` }))
		}
		return node;
	}
}