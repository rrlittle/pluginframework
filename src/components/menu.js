import React from "react";
import { Menu } from "semantic-ui-react";
import { observer, inject } from "mobx-react";

@inject("store", "history", "location")
@observer
export class MenuBar extends React.Component {
	componentWillMount() {
		const { store, history, location } = this.props;
		const { pages } = store;
		const matching_items = pages.filter(page =>
			location.pathname.startsWith(page.route)
		);
		const active_page = matching_items.pop();
		if (!active_page) history.push(pages[0].route);
	}
	render() {
		const { store, history, location } = this.props;
		const { pages } = store;
		const matching_items = pages.filter(page =>
			location.pathname.startsWith(page.route)
		);
		const active_page = matching_items.pop();
		return (
			<Menu attached="top" tabular>
				<Menu.Item header content="Example Plugin Framework" />
				{pages.map(page => (
					<Menu.Item
						key={page.route}
						onClick={() => history.push(page.route)}
						active={active_page.title === page.title}
						name={page.title}
					/>
				))}
			</Menu>
		);
	}
}
