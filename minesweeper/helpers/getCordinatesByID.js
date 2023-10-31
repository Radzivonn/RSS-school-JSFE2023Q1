const getCordinatesByID = (ID) => {
	const y = parseInt(ID.slice(0, ID.indexOf('.')), 10);
	const x = parseInt(ID.slice(ID.indexOf('.') + 1), 10);
	return [x, y];
}

export default getCordinatesByID;
