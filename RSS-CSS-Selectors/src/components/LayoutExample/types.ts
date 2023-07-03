import { ConfigElement } from '@/utils/levels/levelTypes';

export interface IView {
	root: HTMLElement;
	updateView(elements: ConfigElement[]): void;
}

export interface IController {
	view: IView;
	init(): void;
}