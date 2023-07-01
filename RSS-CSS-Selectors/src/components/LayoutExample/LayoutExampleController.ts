import { IController } from './types';
import { LayoutExampleModel } from './LayoutExampleModel';
import { LayoutExampleView } from './LayoutExampleView';

export default class LayoutExampleController implements IController {
	public model: LayoutExampleModel;
	public view: LayoutExampleView;

	constructor() {
		this.model = new LayoutExampleModel();
		this.view = new LayoutExampleView(document.querySelector('.items-container') as HTMLElement);
	}

	public init() {
		this.view.updateView(this.model.currentLevel.elements);
	}
}