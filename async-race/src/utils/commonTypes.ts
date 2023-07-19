export type ResponseCarData = {
	name: string,
	color: string,
	id: number,
};

export type AllCarsData = ResponseCarData[];

export type WinnerData = {
	id: number,
	wins: number,
	time: number,
};

export type AllWinnersData = WinnerData[];

export type CreatedCarData = {
	name: string,
	color: string,
};

export type ListOfCreatedCarsData = CreatedCarData[];