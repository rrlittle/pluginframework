import React from "react";
import { observer, inject } from "mobx-react";
import { Button, Modal, Input } from "semantic-ui-react";

// Example plugin 1
// -----------------

// Goal: allow users to "hide" their data from the allseeing eye
// Real Goal: demonstrate how to allow devs to hook into existing functionality

// Points. This file is not aware of anything really. other is no context for
// this component no ReactDom.render
// It is aware of a store variable, which will be injected in.

// In the index.js file, we use this component in a registerPlugins function.
// Which comes from an OmniStore. an OmniStore will

function obfuscate_text(str, amount) {
	// Wrap the amount
	if (amount < 0) return obfuscate_text(str, amount + 26);

	// Make an output variable
	var output = "";

	// Go through each character
	for (var i = 0; i < str.length; i++) {
		// Get the character we'll be appending
		var c = str[i];

		// If it's a letter...
		if (c.match(/[a-z]/i)) {
			// Get its code
			var code = str.charCodeAt(i);

			// Uppercase letters
			if (code >= 65 && code <= 90)
				c = String.fromCharCode((code - 65 + amount) % 26 + 65);
			else if (code >= 97 && code <= 122)
				// Lowercase letters
				c = String.fromCharCode((code - 97 + amount) % 26 + 97);
		}

		// Append
		output += c;
	}
	return output;
}

/**
on click open a modal with an amount box.
with OK and cancel button. deactivate OK if the amont box is empty.

after OK is clicked store.updateText(obfuscate_text(store.textBody))
**/

@inject("store")
@observer
export class ObfuscateButton extends React.Component {
	state = {
		modalOpen: false
	};
	render() {
		const { store, plugin } = this.props;
		return (
			<Modal
				open={this.state.modalOpen}
				trigger={
					<Button
						content="obfuscate"
						onClick={() => this.setState({ modalOpen: true })}
					/>
				}
			>
				<Input
					type="number"
					placeholder="shift"
					value={plugin.shift}
					onChange={(e, { value }) => plugin.updateShift(+value)}
				/>
				<Button
					content="obfuscate"
					onClick={() => {
						this.setState({ modalOpen: false });
						store.updateText(obfuscate_text(store.textBody, plugin.shift));
					}}
				/>
				<Button
					content="cancel"
					onClick={() => {
						this.setState({ modalOpen: false });
					}}
				/>
			</Modal>
		);
	}
}
