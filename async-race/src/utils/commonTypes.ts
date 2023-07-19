export type ResponseCarData = {
	name: string,
	color: string,
	id: number,
};

export type ListOfCarsData = ResponseCarData[];

export type WinnerData = {
	id: number,
	wins: number,
	time: number,
};

export type ListOfWinnersData = WinnerData[];

export type RequestCarData = {
	name: string,
	color: string,
};

export type ListOfCreatedCarsData = RequestCarData[];