import { ResponseWinnerData } from './commonTypes';

export const BASEREQUESTURL = 'http://127.0.0.1:3000';

export enum PagePathes {
	GARAGE = 'toGarage',
	WINNERS = 'toWinners',
}

export enum RequestDirs {
	CARSDATAPATH = 'garage',
	WINNERSDATAPATH = 'winners',
	ENGINEDATAPATH = 'engine',
}

export enum CustomEvents {
	CARWON = 'carWon',
}

export const carNames = ['Tesla', 'Ford', 'BMW', 'Mersedes-Benz', 'Porshe', 'Lada', 'lamborghini', 'Chevrolet', 'Nissan', 'Mitsubishi', 'Audi'];

export const carModels = ['Model X', 'Mustang', 'X5', 'Maybach', 'Carrera', 'Priora', 'Gallardo', 'Camaro', 'GTR', 'Lancer Evolution X', 'R8'];

export const carColors = ['#000000', '#FF0000', '#FFEA00', '#03FCA1', '#0398FC', '#FFFFFF', '#8800FF', '#FF9900', '#FFD000', '#0026FF', '#00FF26', '#FF009D', '#3D3D3D'];

export const sortingFunctions = {
	fromLargestToSmallest: {
		wins: (carA: ResponseWinnerData, carB: ResponseWinnerData) => carB.wins - carA.wins,
		time: (carA: ResponseWinnerData, carB: ResponseWinnerData) => carB.time - carA.time,
	},
	fromSmallestToLargest: {
		wins: (carA: ResponseWinnerData, carB: ResponseWinnerData) => carA.wins - carB.wins,
		time: (carA: ResponseWinnerData, carB: ResponseWinnerData) => carA.time - carB.time,
	},
};