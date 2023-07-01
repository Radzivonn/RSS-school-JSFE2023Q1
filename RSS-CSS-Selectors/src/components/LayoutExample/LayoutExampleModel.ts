import { IModel } from './types';
import LevelDataStore from "@/utils/store/levelsStore";
import levels from '@/utils/levels';

export class LayoutExampleModel implements IModel {
	public store = new LevelDataStore();
	public currentLevelNumber = this.store.getCurrentLevelNumber();
	public currentLevel = levels[this.currentLevelNumber];
	public levels = levels;
	public completedLevels = this.store.getCompletedLevels();
}