import React from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Omnistore from "./stores/omnistore";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider, observer } from "mobx-react";
import { MenuBar } from "./components/menu";
import { Pages } from "./components/pages";

const store = new Omnistore();
window.store = store;
@observer
class App extends React.Component {
  state = {
    store: store
  };

  render() {
    return (
      <Router>
        <Route
          render={({ history, location }) => (
            <Provider
              store={this.state.store}
              history={history}
              location={location}
            >
              <div>
                <MenuBar />
                <Pages />
              </div>
            </Provider>
          )}
        />
      </Router>
    );
  }
}

export default App;
