import GaragePageModel from './garagePageModel';
import GaragePageView from './garagePageView';
import { Controller } from './types';

export default class GaragePageController implements Controller {
	public view: GaragePageView;
	public model: GaragePageModel;
	
	constructor() {
		this.model = new GaragePageModel();
		this.view = new GaragePageView();
	}

	public async init(): Promise<void> {
		await this.model.setRequestData();
	}

	public getView(): HTMLElement {
		return this.view.createView(this.model.pageNumber, this.model.allCarsData);
	}
}