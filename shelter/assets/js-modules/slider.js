import petsDeck from './pets-deck.js';
import { getRandomNumbers, getCard } from './common-functions.js';
import { tabletBreakpoint, PCBreakpoint } from '../../assets/js-modules/common-variables.js';

const slider = document.querySelector('.slides');
const BTN_LEFT = document.querySelector("#button-left");
const BTN_RIGHT = document.querySelector("#button-right");
let cardsList;
let lastSliderState = []; // cards numbers

/**
 * Function to init a slider
 */
export const sliderInit = () => {
	document.querySelectorAll('.pets-row').forEach(node => node.remove()); 
	let slides = '';
	for (let i = 0; i < 3; i++) slides = slides.concat('<div class="pets-row">', getRandomCards(window.screen.width > PCBreakpoint ? 3 : window.screen.width < tabletBreakpoint ? 1 : 2), '</div>');
	slider.insertAdjacentHTML('afterbegin', slides);
	slider.style.left = `-${document.querySelector('.pets-row').offsetWidth}px`;
}

/**
 * Function to create a random cards deck
 * @param {number} cardsAmount - number of cards
 * @return {string} A string that will be parsed as HTML and inserted into the document's DOM tree
 */
const getRandomCards = (cardsAmount) => {
	let randCardsNode = '';
	let cardNumbers = getRandomNumbers(cardsAmount, lastSliderState);
	lastSliderState = cardNumbers;
	cardNumbers.forEach(number => randCardsNode += getCard(petsDeck[number], number));
	return randCardsNode;
}

const moveLeft = () => {
  slider.classList.add("transition-left");
  BTN_LEFT.removeEventListener("click", moveLeft);
  BTN_RIGHT.removeEventListener("click", moveRight);
};

const moveRight = () => {
  slider.classList.add("transition-right");
  BTN_LEFT.removeEventListener("click", moveLeft);
  BTN_RIGHT.removeEventListener("click", moveRight);
};

BTN_LEFT.addEventListener("click", moveLeft);
BTN_RIGHT.addEventListener("click", moveRight);


slider.addEventListener("animationend", (animationEvent) => {
	cardsList = document.querySelectorAll('.pets-row');
	const [ITEM_LEFT, ACTIVE_ITEM, ITEM_RIGHT] = [cardsList[0], cardsList[1], cardsList[2]];
	let changedItem;
	if (animationEvent.animationName === "move-left") {
		slider.classList.remove("transition-left");
		changedItem = ITEM_LEFT;
		ITEM_RIGHT.innerHTML = ACTIVE_ITEM.innerHTML;
		ACTIVE_ITEM.innerHTML = ITEM_LEFT.innerHTML;
	} else {
		slider.classList.remove("transition-right");
		changedItem = ITEM_RIGHT;
		ITEM_LEFT.innerHTML = ACTIVE_ITEM.innerHTML;
		ACTIVE_ITEM.innerHTML = ITEM_RIGHT.innerHTML;
	}
	changedItem.innerHTML = "";
  changedItem.insertAdjacentHTML('beforeend', getRandomCards(window.screen.width > PCBreakpoint ? 3 : window.screen.width < tabletBreakpoint ? 1 : 2));
	BTN_LEFT.addEventListener("click", moveLeft);
	BTN_RIGHT.addEventListener("click", moveRight);
});