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