import { IModel } from './types';
import { Level } from '@/utils/levelTypes';

export class LayoutExampleModel implements IModel {
	public currentLevel;

	constructor(currentLevel: Level) {
		this.currentLevel = currentLevel;
	}
}