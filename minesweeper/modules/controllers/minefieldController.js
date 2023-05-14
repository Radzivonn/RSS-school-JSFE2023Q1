import getRandomInt from '../helpers/getRandomNumber';
import createNode from '../helpers/createNode';

export default class MinefieldController {
	constructor(fieldSize, minesAmount) {
		this.fieldSize = fieldSize;
		this.minesAmount = minesAmount;
		this.minefieldState = this.getMinefield(this.fieldSize); // array of field state
		this.placeMines();
	}

	getMinefield() {
		const minefield = [];
		for (let y = 0; y < this.fieldSize.sizeY; y += 1) {
			const minefieldRow = [];
			for (let x = 0; x < this.fieldSize.sizeX; x += 1) {
				minefieldRow.push('');
			}
			minefield.push(minefieldRow);
		}
		return minefield;
	}

	placeMines() {
		const mines = this.minesAmount;
		for (let i = mines; i > 0;) {
			const randY = getRandomInt(0, this.fieldSize.sizeY);
			const randX = getRandomInt(0, this.fieldSize.sizeX);
			if (this.minefieldState[randY][randX] === '') {
				this.minefieldState[randY][randX] = 'bomb';
				i -= 1;
			}
		}
	}

	getMinefieldNode() {
		const minefieldSection = createNode('section', 'mine-field');
		for (let y = 0; y < this.fieldSize.sizeY; y += 1) {
			const row = createNode('div', 'mine-field__row');
			for (let x = 0; x < this.fieldSize.sizeX; x += 1) {
				const cell = createNode('div', 'mine-field__cell');
				row.append(cell);
			}
			minefieldSection.append(row);
		}
		return minefieldSection;
	}
}
