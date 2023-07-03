import { IModel } from "./types";
import { Level, LevelsList } from "@/utils/levels/levelTypes";
import LevelDataStore from "@/utils/store/levelsStore";

export default class LevelsBlockModel implements IModel {
	public store = new LevelDataStore();
 
	public getCurrentLevel(): Level {
		return this.store.currentLevel;
	}

	public getLevels(): LevelsList {
		return this.store.levels;
	}

	public getCompletedLevels(): number[] {
		return this.store.completedLevels;
	}

	public prevLevel(): Level {
		if(this.store.currentLevelNumber > 0) this.store.currentLevel = this.store.levels[--this.store.currentLevelNumber];
		return this.store.currentLevel;
	}

	public nextLevel(): Level {
		if(this.store.currentLevelNumber < this.store.levels.length - 1) this.store.currentLevel = this.store.levels[++this.store.currentLevelNumber];
		return this.store.currentLevel;
	}

	public changeLevel(levelNumber: number): Level {
		if (levelNumber >= 0 && levelNumber < this.store.levels.length) {
			this.store.currentLevelNumber = levelNumber;
			this.store.currentLevel = this.store.levels[this.store.currentLevelNumber];
		}
		return this.store.currentLevel;
	}

	public levelCompleted(): Level | string {
		if (!this.store.completedLevels.includes(this.store.currentLevelNumber)) {
			this.store.completedLevels.push(this.store.currentLevelNumber);
			if (this.store.completedLevels.length === this.store.levels.length) return 'You completed all levels!!!';
		}
		return this.nextLevel();
	}

	public resetProgress(): Level {
		this.store.resetProgress()
		return this.getCurrentLevel();
	}

	public saveLevelOptions(): void {
		this.store.saveOptions();
	}
}