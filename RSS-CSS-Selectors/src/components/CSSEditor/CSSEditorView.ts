import { createElement } from "@/utils/helperFuncs";
import { IView } from "./types";
// import { Level } from "@/utils/levelTypes";

export default class CSSEditorView implements IView {
	public root: HTMLElement;
	public CSSInput: HTMLElement
	public CSSTextarea: HTMLElement;
	public enterButton: HTMLElement;

	constructor(root: HTMLElement) {
		this.root = root;
		this.CSSInput = createElement({ tag: 'div', classNames: ['css-input'] });
		this.CSSTextarea = createElement({ tag: 'textarea', id: 'css-selector-textarea' });
		this.CSSTextarea.setAttribute('cols', '15');
		this.CSSTextarea.setAttribute('rows', '3');
		this.CSSTextarea.setAttribute('placeholder', 'Type in a CSS Selector');
		this.enterButton = createElement({ tag: 'button', classNames: ['enter-button'], text: 'ENTER' });
		this.CSSInput.append(this.CSSTextarea, this.enterButton);
	}

	public mount(): void {
		this.root.append(this.CSSInput);
	}

	public updateView(): void {
		(<HTMLTextAreaElement>this.CSSTextarea).value = "";
	}
}