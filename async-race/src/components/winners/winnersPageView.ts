import { ListOfCarsData, ListOfWinnersData } from '@/utils/commonTypes';
import { View } from './types';
import { createCarImg, createElement, createPaginationButtons } from '@/utils/helperFuncs';

export default class WinnersPageView implements View {
	public winnersAmount = createElement({ tag: 'output', classNames: ['cars-number'] });
	public pageNumber = createElement({ tag: 'output', classNames: ['page-number'] });
	public winnersTableColumns = {
		carNumber: createElement({ tag: 'div', classNames: ['winners-table__number-column'] }),
		carImg: createElement({ tag: 'div', classNames: ['winners-table__car-column'] }),
		carName: createElement({ tag: 'div', classNames: ['winners-table__name-column'] }),
		carWins: createElement({ tag: 'div', classNames: ['winners-table__wins-column'] }),
		carBestTime: createElement({ tag: 'div', classNames: ['winners-table__best-time-column'] }),
	};
	public switchButtonsBlock = createElement({ tag: 'div', classNames: ['switch-buttons'] });
	private WINNERSPERPAGE = 10;

	constructor() {
		this.switchButtonsBlock.append(...createPaginationButtons());
	}

	public createView(pageNumber: number, allWinnersData: ListOfWinnersData, allCarsData: ListOfCarsData): HTMLElement {
		const winnersNode = createElement({ tag: 'div', classNames: ['winners-page'] });
		const winnersHeader = createElement({ tag: 'h2', classNames: ['winners-header'], text: 'Garage' });
		const winnersPageHeader = createElement({ tag: 'h3', classNames: ['winners-page-header'], text: 'Page #' });

		winnersHeader.append(this.winnersAmount);
		winnersPageHeader.append(this.pageNumber);

		winnersNode.append(
			winnersHeader,
			winnersPageHeader,
			this.createWinnersTable(pageNumber, allWinnersData, allCarsData),
			this.switchButtonsBlock,
		);

		this.updatePageHeaders(allWinnersData.length, pageNumber);

		return winnersNode;
	}

	private createWinnersTable(pageNumber: number, winnersData: ListOfWinnersData, allCarsData: ListOfCarsData): HTMLElement {
		const winnersTable = createElement({ tag: 'div', classNames: ['winners-table'] });

		this.updateWinnersTableView(pageNumber, winnersData, allCarsData);

		winnersTable.append(
			this.winnersTableColumns.carNumber,
			this.winnersTableColumns.carImg,
			this.winnersTableColumns.carName,
			this.winnersTableColumns.carWins,
			this.winnersTableColumns.carBestTime,
		);
		return winnersTable;
	}

	public updateView(winnersAmount: number, pageNumber: number, winnersData: ListOfWinnersData, allCarsData: ListOfCarsData) {
		this.updatePageHeaders(winnersAmount, pageNumber);
		this.updateWinnersTableView(pageNumber, winnersData, allCarsData);
	}

	private updatePageHeaders(winnersAmount: number, pageNumber: number) {
		this.winnersAmount.textContent = ` ${winnersAmount}`;
		this.pageNumber.textContent = `${pageNumber}`;
	}

	private updateWinnersTableView(pageNumber: number, winnersData: ListOfWinnersData, allCarsData: ListOfCarsData) {
		const numberColumn = [createElement({ tag: 'p', text: 'Number' })];
		const carColumn = [createElement({ tag: 'p', text: 'car' })];
		const nameColumn = [createElement({ tag: 'p', text: 'name' })];
		const winsColumn = [createElement({ tag: 'p', text: 'wins' })];
		const bestTimeColumn = [createElement({ tag: 'p', text: 'Best time (seconds)' })];

		winnersData.slice((pageNumber - 1) * this.WINNERSPERPAGE, pageNumber * this.WINNERSPERPAGE)
			.forEach((winner, index) => {
				const carData = allCarsData.find(data => data.id === winner.id);
				if (carData) {
					const	{ name, color } = carData;
					numberColumn.push(createElement({ tag: 'p', text: String(index + 1) }));
					carColumn.push(createCarImg(color));
					nameColumn.push(createElement({ tag: 'p', text: name }));
					winsColumn.push(createElement({ tag: 'p', text: String(winner.wins) }));
					bestTimeColumn.push(createElement({ tag: 'p', text: String(winner.time) }));
				}
			});
		
		this.winnersTableColumns.carNumber.replaceChildren(...numberColumn);
		this.winnersTableColumns.carImg.replaceChildren(...carColumn);
		this.winnersTableColumns.carName.replaceChildren(...nameColumn);
		this.winnersTableColumns.carWins.replaceChildren(...winsColumn);
		this.winnersTableColumns.carBestTime.replaceChildren(...bestTimeColumn);
	}
}