import { IView } from "./types";
import { ConfigElement } from "@/utils/levels/levelTypes";
import { createElement } from "@/utils/helperFuncs";
import hljs from "highlight.js/lib/common";
import '@/styles/monokai-sublime.min.css';

export default class HTMLViewerView implements IView {
	public root: HTMLElement;
	private hljs = hljs;
	constructor(root: HTMLElement) {
		this.root = root;
		this.hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
	}

	public updateView(elements: Array<ConfigElement>): void {
		this.root.replaceChildren(
			...this.highLightElements(createElement({	tag: 'pre', text: `<div class="table">\n` })),
			...this.getMarkupElements(elements),
			...this.highLightElements(createElement({	tag: 'pre', text: `</div>\n` })),
		);
	}

	private getMarkupElements(elements: Array<ConfigElement>): Array<HTMLElement> {
		return elements.reduce((arr: Array<HTMLElement>, element, index) => {
			arr.push(this.createMarkupElement(element, index));
			return arr;
		}, []);
	}

	/* recursion function */
	private createMarkupElement(element: ConfigElement, uniqueNumber: number): HTMLElement {
		const node = createElement({ tag: 'div', classNames: ['html__markup-code'] });
		if (typeof uniqueNumber === 'number') node.setAttribute('number', `${uniqueNumber}`);
		const highlightingElements = [this.createOpenTag(element)]
		if (element.child) {
			const childElement = this.createMarkupElement(element.child, uniqueNumber + 10);
			highlightingElements.push(childElement, this.createCloseTag(element));
		}
		node.append(...this.highLightElements(...highlightingElements));
		return node;
	}

	private createOpenTag(element: ConfigElement): HTMLElement {
		return createElement({
			tag: 'pre',
			text: `<${element.tag}${element.className ? ` class=${element.className}` : ''}${element.id ? ` id=${element.id}` : ''}${element.child ? '' : '/'}>\n`
		});
	}

	private createCloseTag(element: ConfigElement): HTMLElement {
		return createElement({
			tag: 'pre',
			text: `</${element.tag}>\n`
		});
	}

	private highLightElements(...elements: HTMLElement[]): HTMLElement[] {
		elements.forEach(element => this.hljs.highlightElement(element));
		return elements;
	}
}