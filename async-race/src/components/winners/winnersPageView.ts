import { Cars, Winners } from '@/utils/commonTypes';
import { View } from './types';
import { createCarNode, createElement, createPaginationButtons } from '@/utils/helperFuncs';

export default class WinnersPageView implements View {
	public winnersAmount = createElement({ tag: 'output', classNames: ['cars-number'] });
	public pageNumber = createElement({ tag: 'output', classNames: ['page-number'] });
	public winnersColumnsNames = createElement({ tag: 'div', classNames: ['columns-names'] });
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
		this.winnersColumnsNames.append(
			createElement({ tag: 'p', text: 'Number' }),
			createElement({ tag: 'p', text: 'car' }),
			createElement({ tag: 'p', text: 'name' }),
			createElement({ tag: 'p', classNames: ['sort-button'], id: 'wins', text: 'wins' }),
			createElement({ tag: 'p', classNames: ['sort-button'], id: 'time', text: 'Best time (seconds)' }),
		);
	}

	public createView(): HTMLElement {
		const winnersNode = createElement({ tag: 'div', classNames: ['winners-page'] });
		const winnersHeader = createElement({ tag: 'h2', classNames: ['winners-header'], text: 'Winners' });
		const winnersPageHeader = createElement({ tag: 'h3', classNames: ['winners-page-header'], text: 'Page #' });

		winnersHeader.append(this.winnersAmount);
		winnersPageHeader.append(this.pageNumber);

		winnersNode.append(
			winnersHeader,
			winnersPageHeader,
			this.winnersColumnsNames,
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

	public updateView(pageNumber: number, winnersAmount: number, winnersData: Winners, carsData: Cars) {
		this.updatePageHeaders(winnersAmount, pageNumber);
		this.updateWinnersTableView(winnersData, carsData);
	}

	private updatePageHeaders(winnersAmount: number, pageNumber: number) {
		this.winnersAmount.textContent = ` ${winnersAmount}`;
		this.pageNumber.textContent = `${pageNumber}`;
	}

	private updateWinnersTableView(winnersData: Winners, carsData: Cars) {
		const numberColumn: HTMLElement[] = [];
		const carColumn: HTMLElement[] = [];
		const nameColumn: HTMLElement[] = [];
		const winsColumn: HTMLElement[] = [];
		const bestTimeColumn: HTMLElement[] = [];

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