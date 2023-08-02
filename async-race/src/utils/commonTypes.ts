export type CarResponse = {
	name: string,
	color: string,
	id: number,
};

export type Cars = CarResponse[];

export type WinnerResponse = {
	id: number,
	wins: number,
	time: number,
};

export type Winners = WinnerResponse[];

export type CarRequest = {
	name: string,
	color: string,
};

export type EngineResponse = {
	velocity: number,
	distance: number,
};

export type EngineStatus = 'started' | 'stopped';