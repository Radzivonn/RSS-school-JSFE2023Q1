import { ListOfCarsData, ListOfWinnersData } from '@/utils/commonTypes';
import { View } from './types';
import { createCarNode, createElement, createPaginationButtons } from '@/utils/helperFuncs';

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

	constructor() {
		this.switchButtonsBlock.append(...createPaginationButtons());
	}

	public createView(): HTMLElement {
		const winnersNode = createElement({ tag: 'div', classNames: ['winners-page'] });
		const winnersHeader = createElement({ tag: 'h2', classNames: ['winners-header'], text: 'Garage' });
		const winnersPageHeader = createElement({ tag: 'h3', classNames: ['winners-page-header'], text: 'Page #' });

		winnersHeader.append(this.winnersAmount);
		winnersPageHeader.append(this.pageNumber);

		winnersNode.append(
			winnersHeader,
			winnersPageHeader,
			this.createWinnersTable(),
			this.switchButtonsBlock,
		);

		return winnersNode;
	}

	private createWinnersTable(): HTMLElement {
		const winnersTable = createElement({ tag: 'div', classNames: ['winners-table'] });

		winnersTable.append(
			this.winnersTableColumns.carNumber,
			this.winnersTableColumns.carImg,
			this.winnersTableColumns.carName,
			this.winnersTableColumns.carWins,
			this.winnersTableColumns.carBestTime,
		);
		return winnersTable;
	}

	public updateView(pageNumber: number, winnersAmount: number, winnersData: ListOfWinnersData, carsData: ListOfCarsData) {
		this.updatePageHeaders(winnersAmount, pageNumber);
		this.updateWinnersTableView(winnersData, carsData);
	}

	private updatePageHeaders(winnersAmount: number, pageNumber: number) {
		this.winnersAmount.textContent = ` ${winnersAmount}`;
		this.pageNumber.textContent = `${pageNumber}`;
	}

	private updateWinnersTableView(winnersData: ListOfWinnersData, carsData: ListOfCarsData) {
		const numberColumn = [createElement({ tag: 'p', text: 'Number' })];
		const carColumn = [createElement({ tag: 'p', text: 'car' })];
		const nameColumn = [createElement({ tag: 'p', text: 'name' })];
		const winsColumn = [createElement({ tag: 'p', text: 'wins' })];
		const bestTimeColumn = [createElement({ tag: 'p', text: 'Best time (seconds)' })];

		winnersData.forEach((winner, index) => {
			const carData = carsData.find(car => car.id === winner.id);
				if (carData) {
					const	{ name, color } = carData;
					numberColumn.push(createElement({ tag: 'p', text: String(index + 1) }));
					carColumn.push(createCarNode(color));
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