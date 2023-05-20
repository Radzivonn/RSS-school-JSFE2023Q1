import getRandomInt from '../helpers/getRandomNumber';
import createNode from '../helpers/createNode';

export default class MinefieldController {
	constructor(gameSettings) {
		this.gameSettings = gameSettings;
		this.fieldSizes = {
			easy: {
				sizeX: 10,
				sizeY: 10,
			},
			medium: {
				sizeX: 15,
				sizeY: 15,
			},
			hard: {
				sizeX: 25,
				sizeY: 25,
			},
		};
		this.fieldSize = this.fieldSizes[this.gameSettings.difficulty];
		this.minefieldState = this.getEmptyMinefield(); // array of field state
		this.minefieldState = this.placeMines(this.minefieldState);
	}

	getEmptyMinefield() {
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

	placeMines(field) {
		const resultField = field;
		const mines = this.gameSettings.minesAmount;
		for (let i = mines; i > 0;) {
			const randY = getRandomInt(0, this.fieldSize.sizeY);
			const randX = getRandomInt(0, this.fieldSize.sizeX);
			if (resultField[randY][randX] === '') {
				resultField[randY][randX] = 'bomb';
				i -= 1;
			}
		}
		return resultField;
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
