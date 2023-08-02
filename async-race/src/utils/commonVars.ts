import { WinnerResponse } from './commonTypes';

export enum PagePathes {
	GARAGE = 'toGarage',
	WINNERS = 'toWinners',
}

export enum RequestDirs {
	CARS_PATH = 'garage',
	WINNERS_PATH = 'winners',
	ENGINE_PATH = 'engine',
}

export enum CustomEvents {
	CAR_WON = 'carWon',
}

export const carNames = ['Tesla', 'Ford', 'BMW', 'Mersedes-Benz', 'Porshe', 'Lada', 'lamborghini', 'Chevrolet', 'Nissan', 'Mitsubishi', 'Audi'];

export const carModels = ['Model X', 'Mustang', 'X5', 'Maybach', 'Carrera', 'Priora', 'Gallardo', 'Camaro', 'GTR', 'Lancer Evolution X', 'R8'];

export const carColors = ['#000000', '#FF0000', '#FFEA00', '#03FCA1', '#0398FC', '#FFFFFF', '#8800FF', '#FF9900', '#FFD000', '#0026FF', '#00FF26', '#FF009D', '#3D3D3D'];

export const sortingFunctions = {
	fromLargestToSmallest: {
		wins: (carA: WinnerResponse, carB: WinnerResponse) => carB.wins - carA.wins,
		time: (carA: WinnerResponse, carB: WinnerResponse) => carB.time - carA.time,
	},
	fromSmallestToLargest: {
		wins: (carA: WinnerResponse, carB: WinnerResponse) => carA.wins - carB.wins,
		time: (carA: WinnerResponse, carB: WinnerResponse) => carA.time - carB.time,
	},
};