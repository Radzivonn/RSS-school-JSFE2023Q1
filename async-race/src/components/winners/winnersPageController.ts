import WinnersPageModel from './winnersPageModel';
import WinnersPageView from './winnersPageView';
import { Controller, SortingCriterion, SortingFunction } from './types';
import { CustomEvents, sortingFunctions } from '@/utils/commonVars';

export default class WinnersController implements Controller {
	public view: WinnersPageView;
	public model: WinnersPageModel;

	constructor() {
		this.model = new WinnersPageModel();
		this.view = new WinnersPageView();
	}

	public async init(): Promise<void> {
		this.bindListeners();
	}

	public getView(): HTMLElement {
		const componentView = this.view.createView();
		this.renderView();
		return componentView;
	}

	private async renderView(
		sortingFunction: SortingFunction = sortingFunctions.fromLargestToSmallest.wins,
	): Promise<void> {
		const winnersData = await this.model.getDisplayedWinners(sortingFunction);
		const winnersIDs = winnersData.map(winnerData => String(winnerData.id));
		const carsData = await this.model.getDisplayedCars(winnersIDs);

		this.view.updateView(
			this.model.pageNumber,
			this.model.winnersAmount,
			winnersData,
			carsData,
		);
	}

	private bindListeners(): void {
		this.view.winnersColumnsNames.addEventListener('click', (e) => this.sortButtonHandler(e));
		this.view.previousButton.addEventListener('click', () => {
			this.model.switchToPreviosPage();
			this.renderView();
		});
		this.view.nextButton.addEventListener('click', () => {
			this.model.switchToNextPage();
			this.renderView();
		});
		document.addEventListener(CustomEvents.CAR_WON, (e) => this.carWonHandler(e as CustomEvent));
	}

	private sortButtonHandler(e: MouseEvent): void {
		const clickedElement = e.target as HTMLElement;
		if (clickedElement.classList.contains('sort-button')) {
			const criterion = clickedElement.id as SortingCriterion;

			clickedElement.classList.toggle('down');
			if (clickedElement.classList.contains('down')) {
				this.renderView(sortingFunctions.fromLargestToSmallest[criterion]);
			} else {
				this.renderView(sortingFunctions.fromSmallestToLargest[criterion]);
			}
		}
	}

	private async carWonHandler(e: CustomEvent) {
		const winnerData = await this.model.getWinner(String(e.detail.id));
		if (Object.keys(winnerData).length > 0) this.model.updateWinner(winnerData, e.detail.time);
		else this.model.addWinner(e.detail);
	}
}