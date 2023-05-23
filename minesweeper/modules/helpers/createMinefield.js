import getRandomInt from './getRandomNumber';

export const getEmptyMinefield = (gameSettings) => {
	const field = [];
	for (let y = 0; y < gameSettings.fieldSize.sizeY + 2; y += 1) {
		const fieldRow = [];
		for (let x = 0; x < gameSettings.fieldSize.sizeX + 2; x += 1) {
			fieldRow.push({
				y: y,
				x: x,
				isMined: false,
				isOpened: false,
				minedNeighbors: 0,
			});
		}
		field.push(fieldRow);
	}
	return field;
};

export const placeMines = (field, gameSettings) => {
	const resultField = field;
	const mines = gameSettings.minesAmount;
	for (let i = mines; i > 0;) {
		const randY = getRandomInt(1, gameSettings.fieldSize.sizeY + 1);
		const randX = getRandomInt(1, gameSettings.fieldSize.sizeX + 1);
		if (
			resultField[randY][randX].isMined === false
			&& resultField[randY][randX].isOpened === false
		) {
			resultField[randY][randX].isMined = true;
			i -= 1;
		}
	}
	return resultField;
};

const countMinedNeighbors = (field, cordY, cordX) => {
	let neighbors = field[cordY][cordX].isMined ? -1 : 0;
	for (let i = -1; i < 2; i += 1) {
		for (let j = -1; j < 2; j += 1) {
			if (field[cordY + i][cordX + j].isMined) neighbors += 1;
		}
	}
	return neighbors;
};

export const countAllMinedNeighbors = (field) => {
	const resultField = field;
	for (let cordY = 1; cordY < resultField.length - 1; cordY += 1) {
		const fieldRow = resultField[cordY];
		for (let cordX = 1; cordX < fieldRow.length - 1; cordX += 1) {
			if (!resultField[cordY][cordX].isMined) {
				resultField[cordY][cordX].minedNeighbors = countMinedNeighbors(resultField, cordY, cordX);
			}
		}
	}
	return resultField;
};
