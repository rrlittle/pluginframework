import { ObfuscateButton } from "./obfuscate_button";
import { ObfuscateStore } from "./obfuscate_store";

export const store = ObfuscateStore;
export const pages = [];
export const messengerButtons = [ObfuscateButton];
export const messageConstructors = [
	{ key: "shift", callback: () => store.shift }
];
export const postSendActions = [];
