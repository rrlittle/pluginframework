import React from "react";
import { Segment, TextArea, Button } from "semantic-ui-react";
import { inject, observer } from "mobx-react";
import { ErrorBoundary } from "./error_boundary";

export const Messenger = inject("store")(
	observer(props => {
		const { store } = props;
		const { messengerButtons, textBody, updateText } = store;
		return (
			<Segment>
				<Segment basic>
					<TextArea
						value={textBody}
						autoHeight
						style={{ width: "50%" }}
						onChange={(e, { value }) => updateText(value)}
					/>
				</Segment>
				<Segment basic>
					<Button.Group>
						{messengerButtons.map(({ ActionButton, namespace }, i) => (
							<ErrorBoundary key={i}>
								<ActionButton namespace={namespace} plugin={store[namespace]} />
							</ErrorBoundary>
						))}
					</Button.Group>
				</Segment>
			</Segment>
		);
	})
);

export const SendButton = inject("store")(
	observer(props => {
		const { store } = props;
		return (
			<Button
				color="blue"
				onClick={() => store.sendMessage()}
				content="submit"
			/>
		);
	})
);
