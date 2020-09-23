import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './components/Landing';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import MainPage from './components/MainPage';
import Entry from './components/Entry';

ReactDOM.render(
	<div>
		<React.StrictMode>
			<Router>
				<Switch>
					<Route path="/" component={Entry} />
				</Switch>
			</Router>
		</React.StrictMode>	
	</div>,
	document.getElementById('root')
);
