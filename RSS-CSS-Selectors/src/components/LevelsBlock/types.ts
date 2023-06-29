import { Level, LevelsList } from '@/utils/levelTypes';

export interface IModel {
	currentLevel: Level;
	levels: LevelsList;
}

export interface IView {
	createView(): void;
	updateView(levels: LevelsList, currentLevel: Level): void;
}

export interface IController {
	model: IModel;
	view: IView;
	init(): void;
}

export type ButtonsSet = {
	readonly [key: string]: HTMLElement
}