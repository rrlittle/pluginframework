import { observable, action, useStrict } from "mobx";

useStrict(true);

export class ObfuscateStore {
	@observable shift = 0;

	@action updateShift = val => (this.shift = val);
}
