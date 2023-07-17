export type CarData = {
	name: string,
	color: string,
	id: number,
};

export type AllCarsData = CarData[];

export type WinnerData = {
	id: number,
	wins: number,
	time: number,
};

export type AllWinnersData = WinnerData[];