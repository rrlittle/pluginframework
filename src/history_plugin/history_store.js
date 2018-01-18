import { observable, action } from "mobx";

export class HistoryStore {
	constructor(store) {
		this.omnistore = store;
	}
	@observable omnistore;
	@observable history = [];
	@action
	addEntry = () => {
		this.history.push({ text: this.omnistore.textBody, timestamp: new Date() });
	};
}
