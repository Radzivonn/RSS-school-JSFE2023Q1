import Store from "./store";
import levels from "../levels";

enum DATAKEYS {
	CURRENTLEVELKEY = "currentLevel",
	COMPLETEDLEVELSKEY = "completedLevels"
}

export default class LevelDataStore extends Store {
	DATAKEYS = DATAKEYS;
	public currentLevelNumber = this.getCurrentLevelNumber();
	public currentLevel = levels[this.currentLevelNumber];
	public levels = levels;
	public completedLevels = this.getCompletedLevels();

	private getCurrentLevelNumber() {
		const data = this.getData<number>(this.DATAKEYS.CURRENTLEVELKEY);
		return data ? data - 1 : 0;
	}

	private getCompletedLevels() {
		const data = this.getData<number[]>(this.DATAKEYS.COMPLETEDLEVELSKEY);
		return data ? data : [];
	}
}