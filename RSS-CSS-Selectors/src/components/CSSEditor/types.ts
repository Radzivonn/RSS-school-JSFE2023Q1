export interface IView {
	updateView(): void;
}

export interface IController {
	view: IView;
	init(): void;
}