import { tabletBreakpoint, PCBreakpoint } from '../../assets/js-modules/common-variables.js';

/**
 * returns an array of unique random numbers 
 * @param {number} randNumbersAmount - amount of random numbers
 * @param {object} range - range of random numbers
 * @return {Array}
 */
export const getRandomNumbers = (randNumbersAmount, ignoreNumbers=[], range={min: 0, max: 8}) => {
	let randNumbers = [];
	while (randNumbersAmount > randNumbers.length) {
		const randNum = Math.floor(Math.random() * (range.max - range.min)) + range.min;
		if (!randNumbers.includes(randNum) && !ignoreNumbers.includes(randNum)) randNumbers.push(randNum);
	}
	return randNumbers;
}

export function disableNodes () { for (let key in arguments) arguments[key].disabled = true }
export function ableNodes () { for (let key in arguments) arguments[key].disabled = false }


export const getCard = (card) => {
	return `<div class="pet-card"><img src="${card.img}" alt="pet card">
		<h4> ${card.name} </h4>
		<button class="card-button"> Learn more </button>
		</div>`;
}