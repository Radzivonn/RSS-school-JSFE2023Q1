import { Level, LevelsList, ConfigElement } from '@/utils/levelTypes';

export interface IModel {
	currentLevel: Level;
	levels: LevelsList;
}

export interface IView {
	updateView(elemnets: Array<ConfigElement>): void;
}

export interface IController {
	model: IModel;
	view: IView;
	init(): void;
}