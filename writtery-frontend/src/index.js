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
					<Route path="/entry" exact component={Entry} />
					<Route path="/" exact component={Landing} />
					<Route path="/home" exact component={MainPage} />
				</Switch>
			</Router>
		</React.StrictMode>	
	</div>,
	document.getElementById('root')
);
