import WinnersPageModel from './winnersPageModel';
import WinnersPageView from './winnersPageView';
import { Controller } from './types';

export default class WinnersController implements Controller {
	public view: WinnersPageView;
	public model: WinnersPageModel;

	constructor() {
		this.model = new WinnersPageModel();
		this.view = new WinnersPageView();
	}

	public async init(): Promise<void> {
		this.model.setRequestData().catch(error => console.error(error));
	}

	public getView() {
		return this.view.createView(this.model.pageNumber, this.model.allWinnersData, this.model.allCarsData);
	}
}