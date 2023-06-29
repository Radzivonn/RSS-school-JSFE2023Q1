import { IController } from './types';
import { LayoutExampleModel } from './LayoutExampleModel';
import { LayoutExampleView } from './LayoutExampleView';
import { Level } from '@/utils/levelTypes';

export class LayoutExampleController implements IController {
	public model: LayoutExampleModel;
	public view: LayoutExampleView;

	constructor(root: HTMLElement, currentLevel: Level) {
		this.model = new LayoutExampleModel(currentLevel);
		this.view = new LayoutExampleView(root);
	}

	public init() {
		this.view.updateView(this.model.currentLevel.markup);
	}
}