import React from "react";
import { Table } from "semantic-ui-react";
import { observer } from "mobx-react";

export const HistoryPage = observer(props => {
	const { plugin } = props;
	return (
		<Table>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Text</Table.HeaderCell>
					<Table.HeaderCell>Time Stamp</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{plugin.history.map(h => (
					<Table.Row>
						<Table.Cell>{h.text}</Table.Cell>
						<Table.Cell>{h.timestamp}</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
});
