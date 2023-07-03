import { ConfigElement } from '@/utils/levels/levelTypes';

export interface IView {
	updateView(elemnets: Array<ConfigElement>): void;
}

export interface IController {
	view: IView;
	init(): void;
}