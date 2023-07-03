import { Level, LevelsList } from '@/utils/levels/levelTypes';

export interface IModel {
	prevLevel(): Level;
	nextLevel(): Level;
	changeLevel(levelNumber: number): Level;
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