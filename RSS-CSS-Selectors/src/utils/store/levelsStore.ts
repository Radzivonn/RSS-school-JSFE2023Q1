import Store from "./store";

enum DATAKEYS {
	CURRENTLEVELKEY = "currentLevel",
	COMPLETEDLEVELSKEY = "completedLevels"
}

export default class LevelDataStore extends Store {
	DATAKEYS = DATAKEYS;

	public getCurrentLevelNumber(): number {
		const data: number = this.getData(this.DATAKEYS.CURRENTLEVELKEY);
		return data ? data - 1 : 0;
	}

	public getCompletedLevels(): Array<number> {
		const data: Array<number> = this.getData(this.DATAKEYS.COMPLETEDLEVELSKEY);
		return data ? data : [];
	}
}