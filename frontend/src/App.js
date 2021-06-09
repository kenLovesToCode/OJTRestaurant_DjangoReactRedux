import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import dataStore from './store';
import Home from "./components/Home"
import CategoryEditor from './components/category/CategoryEditor';
import Category from './components/category/Category'
import Menu from './components/menu/Menu'
import MenuEditor from './components/menu/MenuEditor';
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from 'react-alert-template-basic';

const alertOptions = {
	timeout: 1500,
	positin: 'top center'
}

function App() {
	return (
		<Provider store={dataStore}>
			<AlertProvider template={AlertTemplate} {...alertOptions}>
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => <Home />}
						/>
						<Route
							exact path="/restaurant/menu" render={() => <Menu />}
						/>
						<Route
							exact path='/restaurant/category' render={() => <Category />}
						/>
						<Route
							path='/restaurant/category/editor' render={() => <CategoryEditor />}
						/>
						<Route
							path='/restaurant/menu/editor' render={() => <MenuEditor />}
						/>
					</Switch>
				</Router>
			</AlertProvider>
		</Provider>
	);
}

export default App;
