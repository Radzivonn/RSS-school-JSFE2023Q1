import petsDeck from '../../assets/js-modules/pets-deck.js';

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

/* returns a string that contains pet card HTML layout */
export const getCard = (card, cardNumber) => {
	return `<div class="pet-card" id=${cardNumber + 1}><img src="${card.img}" alt="pet card">
		<h4> ${card.name} </h4>
		<button class="card-button"> Learn more </button>
		</div>`;
}

/* returns a string that contains modal window HTML layout */
export const getModalWindow = (card) => {
	return `<div class="modal-window-BG active">
		<div class="modal">
			<div class="modal-window">
				<img src="${card.img}" alt="pet img">
				<div class="modal-info-block">
					<h3> ${card.name} </h3>
					<h4> ${card.type} - ${card.breed} </h4>
					<p> ${card.description} </p>
					<ul>
						<li>
							<b> Age: ${card.age} </b>
						</li>
						<li>
							<b>inoculations: ${card.inoculations} </b>
						</li>
						<li>
							<b> diseases: ${card.diseases} </b>
						</li>
						<li>
							<b> parasites: ${card.parasites} </b>
						</li>
					</ul>
				</div>
			</div>
			<button class="arrowButton" id="modal-cross"> 
				<img src="../../assets/icons/cross.svg" alt="arrow"> 
			</button>
		</div>
	</div>`
}

export function openModalWindow(e) {
	if (e.target.closest('.pet-card')) {
		document.body.classList.add('_lock');
		document.querySelector('.wrapper').insertAdjacentHTML('beforeend', getModalWindow(petsDeck[e.target.closest('.pet-card').id - 1]));
		const modalWindow = document.querySelector('.modal-window-BG');
		modalWindow.classList.add('active');
		modalWindow.addEventListener('click', closeModalWindow);
	}
}

const closeModalWindow = (e) => {
	if (!e.target.closest('.modal-window')) {
		const modalWindow = document.querySelector('.modal-window-BG');
		modalWindow.classList.remove('active');
		modalWindow.removeEventListener('click', closeModalWindow);
		document.body.classList.remove('_lock');
		modalWindow.remove();
	}
}