import React, { Component } from 'react';
import '../stylesheets/global.css';
import '../stylesheets/landing.css';
import logo from '../pictures/writteryLogo.png';
import bookGirl from '../pictures/bookgirlYellow.svg';

class Landing extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div id="App">
				<div id="home" className="home">
					<nav>
						<div className="brand">
							<img id="logo" src={logo} alt="Writtery Logo" />
							<h2>Writtery</h2>
						</div>
						<ul>
							<li id="nav-link">About</li>
							<li id="nav-link">Contact</li>
							<li id="nav-link">Login</li>
						</ul>
					</nav>
				</div>
			</div>
		);
	}
}

export default Landing;
