export type ResponseCarData = {
	name: string,
	color: string,
	id: number,
};

export type ListOfCarsData = ResponseCarData[];

export type RequestWinnerData = {
	wins: number,
	time: number,
};

export type ResponseWinnerData = {
	id: number,
	wins: number,
	time: number,
};

export type ListOfWinnersData = ResponseWinnerData[];

export type RequestCarData = {
	name: string,
	color: string,
};

export type ListOfCreatedCarsData = RequestCarData[];

export type EngineData = {
	velocity: number,
	distance: number,
};

export type EngineStatus = 'started' | 'stopped';