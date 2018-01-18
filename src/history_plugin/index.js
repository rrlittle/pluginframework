import { HistoryStore } from "./history_store";
import { HistoryPage } from "./history_page";

export const store = HistoryStore;
export const pages = [
	{ title: "history", route: "/history", component: HistoryPage }
];
export const messengerButtons = [];
export const messageConstructors = [
	{ key: "history", callback: () => store.addEntry() }
];
export const postSendActions = [];
