import { IController } from './types';
import { LayoutExampleView } from './LayoutExampleView';
import { hoverHandler } from '@/utils/helperFuncs';

export default class LayoutExampleController implements IController {
	public view: LayoutExampleView;

	constructor() {
		this.view = new LayoutExampleView(document.querySelector('.items-container') as HTMLElement);
	}

	public init() {
		this.bindListeners();
	}

	private bindListeners() {
		this.view.root.addEventListener('mouseover', (e) => hoverHandler(e, 'exampleObject'));
		this.view.root.addEventListener('mouseout', (e) => hoverHandler(e, 'exampleObject'));
		document.addEventListener (
			'changeLevel',
			(e) => this.view.updateView((<CustomEvent>e).detail.currentLevel.elements)
		);
	}
}