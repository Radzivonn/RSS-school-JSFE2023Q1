import { Level } from '@/utils/levelTypes';

export interface IModel {
	currentLevel: Level;
}

export interface IView {
	root: HTMLElement;
	updateView(markup: string, place: InsertPosition): void;
}

export interface IController {
	model: IModel;
	view: IView;
	init(): void;
}