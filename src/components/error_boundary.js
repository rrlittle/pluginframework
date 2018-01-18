import React from "react";

export class ErrorBoundary extends React.Component {
	state = {
		error: null
	};
	componentDidCatch(err, info) {
		console.error("Caught err", err, info);
		this.setState({ error: { err: err, info: info } });
	}
	render() {
		if (!this.state.error) return this.props.children;
		else return this.state.info;
	}
}
