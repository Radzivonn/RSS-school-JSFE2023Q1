import { IView } from './types';

export class LayoutExampleView implements IView {
	public root: HTMLElement;
	
	constructor(root: HTMLElement) {
		this.root = root;
	}

	public updateView(markup: string, place: InsertPosition = 'beforeend'): void {
		this.root.textContent = '';
		this.root.insertAdjacentHTML(place, markup);
	}
}