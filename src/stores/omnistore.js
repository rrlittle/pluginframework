import { observable, action, useStrict } from "mobx";
import { Messenger } from "../components/messenger";
import { LandingPad } from "../components/landing_page";
import { SendButton } from "../components/messenger";

useStrict(true);

export default class OmniStore {
	constructor() {
		// set up core app functionality
		// add nav items
		this.pages.push({
			title: "Landing Page",
			component: LandingPad,
			route: "/"
		});

		this.pages.push({
			title: "Messenger",
			component: Messenger,
			route: "/messenger"
		});

		// add the main action button
		this.messengerButtons.push({ ActionButton: SendButton });

		// add the send event
		this.messageConstructors.push({ key: "body", callback: this.getTextBody });

		// add post send event
		this.postSendActions.push({ callback: this.clearTextBody });

		// import plugins

		import("../obfuscate_plugin").then(plugin => {
			this.registerPlugin("encrypt", plugin);
		});

		import("../history_plugin").then(plugin => {
			this.registerPlugin("history", plugin);
		});
		// add more plugins here as per these example.
		// variables dont work inside import, so they must be statically defined.
		// then we want to define a unique namespace for each plugin
	}

	@action
	registerPlugin = (namespace, plugin) => {
		console.log("registering", namespace, plugin);
		const plugin_store = plugin.store || null;
		if (plugin_store) this[namespace] = observable(new plugin_store(this));

		const pages = plugin.pages || [];
		pages.map(page => this.addPage(namespace, page));

		const buttons = plugin.messengerButtons || [];
		buttons.map(button => this.addMessengerButton(namespace, button));

		const messages = plugin.messageConstructors || [];
		messages.map(message => this.addMessageConstructor(namespace, message));

		const actions = plugin.postSendActions || [];
		actions.map(action => this.addPostSendAction(namespace, action));
	};

	// allow plugins to provide whole pages
	@observable pages = [];

	@action
	addPage = (namespace, { route, component, title }) => {
		console.log("adding page for", namespace, route, component, title);
		this.pages.push({
			route: route,
			component: component,
			title: title,
			namespace: namespace
		});
	};

	// allow plugins to add buttons to the bottom of the text box in messenger
	@observable messengerButtons = [];

	@action
	addMessengerButton = (namespace, button) => {
		this.messengerButtons.push({ ActionButton: button, namespace: namespace });
	};

	// allow plugins to define what sort of stuff gets sent in the message
	@observable messageConstructors = [];

	@action
	addMessageConstructor = (namespace, { key, callback }) => {
		this.messageConstructors.push({
			key: key,
			callback: callback,
			namespace: namespace
		});
	};

	// allow plugins to define actions that occur after a message is sent
	@observable postSendActions = [];
	@action
	addPostSendAction = (namespace, callback) => {
		this.postSendActions.push({ callback: callback, namespace: namespace });
	};

	/** ====== APP FUNCTIONALITY ============= **/

	@observable textBody = "";

	// callable to get the textbody
	getTextBody = () => this.textBody;

	// callable to clear the textbody
	@action clearTextBody = () => (this.textBody = "");

	// modify the textBody
	@action
	updateText = value => {
		this.textBody = value;
	};

	// send the message in this.textBody
	@action
	sendMessage = () => {
		// build the message in an extendable way
		let msg = {};
		this.messageConstructors.map(({ key, callback, namespace }) => {
			try {
				msg[key] = callback();
			} catch (err) {
				console.warn(
					"error for messageConstructor",
					key,
					"in",
					callback,
					"from",
					namespace
				);
			}
		});
		// post the message
		console.log(msg);

		// post send hook
		this.postSendActions.map(({ callback }) => callback());
	};
}
