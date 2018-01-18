import React from "react";
import { Route } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { ErrorBoundary } from "./error_boundary";

export const Pages = inject("store")(
	observer(props => {
		const { store } = props;
		const pages = store.pages;
		return pages.map(page => (
			<ErrorBoundary key={page.route}>
				<Route
					path={page.route}
					exact
					render={() => {
						let Page = page.component;
						return <Page plugin={store[page.namespace]} />;
					}}
				/>
			</ErrorBoundary>
		));
	})
);
