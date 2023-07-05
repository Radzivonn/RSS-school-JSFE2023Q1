import { createElement, printString } from "@/utils/helperFuncs";
import { IView } from "./types";

export default class CSSEditorView implements IView {
	public root: HTMLElement;
	public CSSInput: HTMLElement
	private CSSTextarea: HTMLElement;
	public enterButton: HTMLElement;
	public helpButton: HTMLElement;
	private correctSelector = ''; // for help button

	constructor(root: HTMLElement) {
		this.root = root;
		this.CSSInput = createElement({ tag: 'div', classNames: ['css-input'] });
		this.CSSTextarea = createElement({ tag: 'textarea', id: 'css-selector-textarea' });
		this.CSSTextarea.setAttribute('cols', '15');
		this.CSSTextarea.setAttribute('rows', '3');
		this.CSSTextarea.setAttribute('placeholder', 'Type in a CSS Selector');
		this.enterButton = createElement({ tag: 'button', classNames: ['input-button', 'enter-button'], text: 'ENTER' });
		this.helpButton = createElement({ tag: 'button', classNames: ['input-button', 'help-button'], text: 'HELP' });
		const buttonsWrapper = createElement({ tag: 'div', classNames: ['buttons-wrapper'] });
		buttonsWrapper.append(this.enterButton, this.helpButton);
		this.CSSInput.append(this.CSSTextarea, buttonsWrapper);
	}

	public mount(): void {
		this.root.append(this.CSSInput);
	}

	public updateView(): void {
		(<HTMLTextAreaElement>this.CSSTextarea).value = "";
	}

	public getInputData(): string {
		return (<HTMLTextAreaElement>this.CSSTextarea).value;
	}

	public setCorrectSelector(selector: string): void {
		this.correctSelector = selector;
	}

	public writeCorrectAnswer(printSpeed = 200): void {
		/* disable enter button while typing */
		(<HTMLButtonElement>this.enterButton).disabled = true;
		setTimeout(() => (<HTMLButtonElement>this.enterButton).disabled = false, printSpeed * this.correctSelector.length);
		printString<typeof this.CSSTextarea>(this.correctSelector, this.CSSTextarea, printSpeed);
	}
}