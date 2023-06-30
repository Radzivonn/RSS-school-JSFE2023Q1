type ValidStoreData = number | Array<number>;

interface IStore {
	getData<T>(key: string): T;
	saveData(key: string, data: ValidStoreData): void;
}

export default abstract class Store implements IStore {
	public getData<T>(key: string): T {
		const storeData = localStorage.getItem(key);
		return storeData ? JSON.parse(storeData) : null;
	}

	public saveData(key: string, data: ValidStoreData): void {
		localStorage.setItem(key, JSON.stringify(data));
	}
}