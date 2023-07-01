import { IController } from "./types";
import HTMLViewerModel from "./HTMLViewerModel";
import HTMLViewerView from "./HTMLViewerView";

export default class HTMLViewerController implements IController {
	public model: HTMLViewerModel;
	public view: HTMLViewerView;

	constructor() {
		this.model = new HTMLViewerModel();
		this.view = new HTMLViewerView(document.querySelector('code.html .html__markup-code') as HTMLElement);
	}

	public init(): void {
		this.view.updateView(this.model.currentLevel.elements);
	}
}