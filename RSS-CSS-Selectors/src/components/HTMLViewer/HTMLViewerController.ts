import { IController } from "./types";
import HTMLViewerView from "./HTMLViewerView";
import { hoverHandler } from "@/utils/helperFuncs";

export default class HTMLViewerController implements IController {
	public view: HTMLViewerView;

	constructor() {
		this.view = new HTMLViewerView(document.querySelector('code.html .html__markup-code') as HTMLElement);
	}

	public init(): void {
		this.bindListeners();
	}

	private bindListeners() {
		this.view.root.addEventListener('mouseover', (e) => hoverHandler(e, 'html__markup-code'));
		this.view.root.addEventListener('mouseout', (e) => hoverHandler(e, 'html__markup-code'));
		document.addEventListener (
			'changeLevel',
			(e) => this.view.updateView((<CustomEvent>e).detail.currentLevel.elements)
		);
	}
}