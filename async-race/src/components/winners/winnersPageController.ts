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
		const winnersData = await this.model.getDisplayedWinnersData(sortingFunction);
		const winnersIDs = winnersData.map(winnerData => String(winnerData.id));
		const carsData = await this.model.getDisplayedCarsData(winnersIDs);

		this.view.updateView(
			this.model.pageNumber,
			this.model.winnersAmount,
			winnersData,
			carsData,
		);
	}

	private bindListeners(): void {
		this.view.switchButtonsBlock.addEventListener(
			'click',
			(e) => this.paginationButtonsHandler(e),
		);
		this.view.winnersColumnsNames.addEventListener('click', (e) => this.sortButtonHandler(e));
		document.addEventListener(CustomEvents.CARWON, (e) => this.carWonHandler(e as CustomEvent));
	}

	private paginationButtonsHandler(e: MouseEvent): void {
		const clickedElement = e.target as HTMLElement;
		if (
			(clickedElement && clickedElement.classList.contains('next-button') && this.model.switchToNextPage())
			|| (clickedElement && clickedElement.classList.contains('previous-button') && this.model.switchToPrevPage())
		) {
			this.renderView();		
		}
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
		const winnerData = await this.model.getWinnerData(String(e.detail.id));
		if (Object.keys(winnerData).length > 0) this.model.updateWinner(winnerData, e.detail.time);
		else this.model.addWinner(e.detail);
	}
}