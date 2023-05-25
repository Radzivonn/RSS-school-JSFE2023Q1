import createNode from './createNode';

const lightThemeIconPath = require('../../assets/svg/light-theme-icon.svg');
const darkThemeIconPath = require('../../assets/svg/dark-theme-icon.svg');

export const getSettingsWidgetLayout = (gameSettings, colorTheme) => `
<div class="settings-modal">
	<div class="theme-toggle">
		<p> theme </p>
		<img class="theme-icon ${colorTheme === 'light' ? 'active' : ''}" id="light-theme" src=${lightThemeIconPath} alt="icon">
		<img class="theme-icon ${colorTheme === 'dark' ? 'active' : ''}" id="dark-theme" src=${darkThemeIconPath} alt="icon">
	</div>
	<div class="change-mines-amount">
		<p> Mines amount </p>
		<input class="change-mines-amount__bar" type="range" min="10" max="99" step="1" value="${gameSettings.minesAmount}">
		<output class="mines-amount"> ${gameSettings.minesAmount} </output>
	</div>
	<select class="game-difficulty">
		<option class="game-difficulty__option" value="easy"> easy </option>
		<option class="game-difficulty__option" value="medium"> medium </option>
		<option class="game-difficulty__option" value="hard"> hard</option>
	</select>
</div>`;

export const getInterfaceLayout = (gameSettings) => `
<section class="info-section">
	<output class="clicks-amount"> ${gameSettings.clicksAmount} </output>
	<button class="reset-button"> new game </button>
	<time class="game-time"> ${gameSettings.gameTime} </time>
	<div class="settings-button"></div>
</section>`;

export const getMinesCounterLayout = (gameSettings) => `
	<section class="counters"> 
		<output class="mines-counter"> Mines ${gameSettings.minesAmount} </output>
		<output class="flags-counter"> Flags ${gameSettings.flagsCounter} </output>
	</section>`;

export const getMinefieldNode = (field) => {
	const minefieldSection = createNode('section', 'mine-field');
	minefieldSection.setAttribute('oncontextmenu', 'return false');
	for (let cordY = 1; cordY < field.length - 1; cordY += 1) {
		const fieldRow = field[cordY];
		const rowNode = createNode('div', 'mine-field__row');
		for (let cordX = 1; cordX < fieldRow.length - 1; cordX += 1) {
			const cellNode = createNode('div', 'mine-field__cell');
			const cell = fieldRow[cordX];
			cellNode.id = ''.concat(cordY, '.', cordX);
			if (cell.isMined) cellNode.classList.add('mined-cell');
			if (cell.isOpened) cellNode.classList.add('opened-cell');
			if (cell.isMarked) cellNode.classList.add('marked-cell');
			rowNode.append(cellNode);
		}
		minefieldSection.append(rowNode);
	}
	return minefieldSection;
};

export const getFinishModalLayout = () => `
<div class="finish-modal">
	<h2 class="finish-message"></h2>
	<button class="reset-button"> new game </button>
</div>`;

export const getScoreLayout = (score) => {
	let layout = "<div class='score-modal'>";
	score.forEach((gameState) => {
		layout += `
		<div class="score-item">
			<div class="score-outcome"> ${gameState.gameState} </div>
			<div class="score-time"> ${gameState.gameTime} seconds </div>
			<div class="score-difficulty"> ${gameState.difficulty} </div>
			<div class="score-mines-amount"> ${gameState.minesAmount} mines </div>
		 </div>`;
	});
	layout += '<h2> Score </h2></div>';
	return layout;
};
