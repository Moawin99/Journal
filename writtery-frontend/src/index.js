import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './components/Landing';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import MainPage from './components/MainPage';
import Entry from './components/Entry';
import Login from './components/login';
import Register from './components/register';
import {configureStore} from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import moodReducer from './reducers/mood';

const store = configureStore({
	reducer: {
		mood: moodReducer
	}
});



ReactDOM.render(
	// <div>
		<React.StrictMode>
			<Provider store={store}>
				<Router>
					<Switch>
						<Route path="/entry" exact component={Entry} />
						<Route path="/" exact component={Landing} />
						<Route path="/home" exact component={MainPage} />
						<Route path="/login" exact component={Login} />
						<Route path="/register" exact component={Register} />
					</Switch>
				</Router>
			</Provider>
		</React.StrictMode>,
	// </div>,
	document.getElementById('root')
);
