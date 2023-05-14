export default function createNode(tag = 'div', className = '') {
	const node = document.createElement(tag);
	node.classList.add(className);
	return node;
}
