import { Level, ConfigElement } from '@/utils/levelTypes';

export interface IModel {
	currentLevel: Level;
}

export interface IView {
	root: HTMLElement;
	updateView(elements: Array<ConfigElement>): void;
}

export interface IController {
	model: IModel;
	view: IView;
	init(): void;
}