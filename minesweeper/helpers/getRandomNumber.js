export default function getRandomInt(min, max) {
	// Максимум не включается, минимум включается
	return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
}
