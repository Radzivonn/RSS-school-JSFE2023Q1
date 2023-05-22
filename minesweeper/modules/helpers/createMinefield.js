import getRandomInt from './getRandomNumber';

const getEmptyMinefield = (gameSettings) => {
	const minefield = {};
	for (let y = 0; y < gameSettings.fieldSize.sizeY; y += 1) {
		const minefieldRow = {};
		for (let x = 0; x < gameSettings.fieldSize.sizeX; x += 1) {
			minefieldRow[`${x}`] = {
				isMined: false,
				isOpened: false,
				minesAmountNearby: 0,
			};
		}
		minefield[`${y}`] = minefieldRow;
	}
	return minefield;
};

const placeMines = (field, gameSettings) => {
	const resultField = field;
	const mines = gameSettings.minesAmount;
	for (let i = mines; i > 0;) {
		const randY = getRandomInt(0, gameSettings.fieldSize.sizeY);
		const randX = getRandomInt(0, gameSettings.fieldSize.sizeX);
		if (resultField[randY][randX].isMined === false) {
			resultField[randY][randX].isMined = true;
			i -= 1;
		}
	}
	return resultField;
};

const getMinefieldState = (gameSettings) => placeMines(
	getEmptyMinefield(gameSettings),
	gameSettings,
);

export default getMinefieldState;
