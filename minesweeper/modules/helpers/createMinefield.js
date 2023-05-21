import getRandomInt from './getRandomNumber';

const getEmptyMinefield = (gameSettings) => {
	const minefield = [];
	for (let y = 0; y < gameSettings.fieldSize.sizeY; y += 1) {
		const minefieldRow = [];
		for (let x = 0; x < gameSettings.fieldSize.sizeX; x += 1) {
			minefieldRow.push('');
		}
		minefield.push(minefieldRow);
	}
	return minefield;
};

const placeMines = (field, gameSettings) => {
	const resultField = field;
	const mines = gameSettings.minesAmount;
	for (let i = mines; i > 0;) {
		const randY = getRandomInt(0, gameSettings.fieldSize.sizeY);
		const randX = getRandomInt(0, gameSettings.fieldSize.sizeX);
		if (resultField[randY][randX] === '') {
			resultField[randY][randX] = 'bomb';
			i -= 1;
		}
	}
	return resultField;
};

const getMinefieldState = gameSettings => placeMines(getEmptyMinefield(gameSettings), gameSettings);
export default getMinefieldState;
