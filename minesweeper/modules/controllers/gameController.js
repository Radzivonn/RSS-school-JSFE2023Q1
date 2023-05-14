import MinefieldController from './minefieldController';
import createNode from '../helpers/createNode';

export default class GameController {
	constructor(gameDifficulty, minesAmount) {
		this.gameDifficulty = gameDifficulty;
		this.minesAmount = minesAmount;
		this.fieldSizes = {
			easy: {
				sizeX: 10,
				sizeY: 10,
			},
			medium: {
				sizeX: 20,
				sizeY: 20,
			},
			hard: {
				sizeX: 25,
				sizeY: 25,
			},
		};
		this.gameState = 'in progress';
		this.init();
	}

	init() {
		/* create minefield */
		this.minefield = new MinefieldController(
			this.fieldSizes[this.gameDifficulty],
			this.minesAmount,
		);
		this.setPageLayout();
	}

	setPageLayout() {
		const wrapper = createNode('div', 'wrapper');
		const header = createNode('header', 'header');
		const gameField = createNode('article', 'game-field');
		gameField.append(this.minefield.getMinefieldNode());
		wrapper.append(header);
		wrapper.append(gameField);
		document.body.prepend(wrapper);
	}
}
