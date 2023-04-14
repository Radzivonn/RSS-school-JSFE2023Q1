import petsDeck from './pets-deck.js';
import { getRandomNumbers, disableNodes, ableNodes, getCard } from './common-functions.js';

const DECK_LENGTH = 48;
let currentPageNumber = 1;

const petsBlock = document.querySelector('.pets-list');
const tofirstPageButton = document.querySelector('#firstPage');
const toLastPageButton = document.querySelector('#lastPage');
const toPreviousPageButton = document.querySelector('#previousPage');
const toNextPageButton = document.querySelector('#nextPage');
const activePageButton = document.querySelector('#activePage');

const getPagesAmount = () => window.screen.width > 965 ? 8 : window.screen.width < 663 ? 3 : 6;

/**
 *returns transformed deck depending on screen resolution
 * @param {Array} deck current deck
 * @param {number} deckLength deck length 
 * @param {number} [cardsAmountOnPage=getPagesAmount()] number of cards per page
 * @return {Array} transformed deck
 */
const transformDeck = (deck, deckLength, cardsAmountOnPage = getPagesAmount()) => {
	let initialDeck = deck.flat();
	let transformedDeck = [];
	for (let i = 0; i < deckLength; i += cardsAmountOnPage) transformedDeck.push(initialDeck.slice(i, i + cardsAmountOnPage));
	return transformedDeck;
}

/**
 *returns start deck depending on screen resolution
 * @param {number} deckLength deck length 
 * @param {number} [cardsAmountOnPage=getPagesAmount()] number of cards per page
 * @return {Array} deck
 */
const getPaginationDeck = (deckLength, cardsAmountOnPage = getPagesAmount()) => {
	let deck = [];
	let randArray = getRandomNumbers(8);
	let cutArray = [randArray.slice(0, 3), randArray.slice(3, 6), randArray.slice(6, randArray.length)];
	for (let i = 0; i < 6; i++) {
		let shuffleArray = [];
		cutArray.forEach(subArray => {
			const randIndex = getRandomNumbers(subArray.length, [], { min: 0, max: subArray.length });
			shuffleArray.push(randIndex.map(index => subArray[index]));
		});
		shuffleArray.forEach(subArray => deck.push(...subArray));
	}
	return transformDeck(deck, deckLength, cardsAmountOnPage);
}

/**
 *returns a string that will be parsed as HTML and inserted into the document's DOM tree
 * @param {number} pageNumber page number
 * @return {string} A string that contains cards HTML layout depending on page number
 */
const getPageCards = (pageNumber) => {
	let cardsNode = '';
	paginationDeck[pageNumber - 1].forEach(number => cardsNode = cardsNode.concat(getCard(petsDeck[number], number)));
	return cardsNode;
}

const pageValidation = (pageNumber) => {
	if (pageNumber === 1) {
		disableNodes(toPreviousPageButton, tofirstPageButton);
		ableNodes(toNextPageButton, toLastPageButton);
	}	else if (pageNumber === DECK_LENGTH / getPagesAmount()) {
		ableNodes(toPreviousPageButton, tofirstPageButton);
		disableNodes(toNextPageButton, toLastPageButton);
	} else {
		ableNodes(toPreviousPageButton, tofirstPageButton);
		ableNodes(toNextPageButton, toLastPageButton);
	}
}

export function pageSwitcher(transformDeckToggle = false) {
	if (transformDeckToggle) {
		paginationDeck = transformDeck(paginationDeck, DECK_LENGTH);
		currentPageNumber = 1;
	}
	pageValidation(currentPageNumber);
	const allCards = document.querySelectorAll('.pets-list .pet-card');
	allCards.forEach(node => node.remove());
	petsBlock.insertAdjacentHTML('afterbegin', getPageCards(currentPageNumber));
	activePageButton.textContent = currentPageNumber;
}

tofirstPageButton.addEventListener('click', () => {
	currentPageNumber = 1;
	pageSwitcher();
});
toLastPageButton.addEventListener('click', () => {
	currentPageNumber = DECK_LENGTH / getPagesAmount()
	pageSwitcher();
});

toPreviousPageButton.addEventListener('click', () => {
	currentPageNumber--;
	pageSwitcher()
});
toNextPageButton.addEventListener('click', () => {
	currentPageNumber++;
	pageSwitcher()
});

let paginationDeck = getPaginationDeck(DECK_LENGTH); // init paginationDeck