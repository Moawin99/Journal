import React, { Component } from 'react';
import '../stylesheets/global.css';
import '../stylesheets/landing.css';
import logo from '../pictures/WritteryLogo.png';
import bookGirl from '../pictures/bookgirlYellow.svg';
import Button from '../components/LandingButtons';
import musicPic from '../pictures/MusicSvg.svg';

class Landing extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div id="App">
				<div id="home" className="home">
					<svg className="blob1" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
						<path
							fill="#F7B71E"
							d="M44.7,-30.1C57.3,-19.9,66.4,-1.3,63.9,16.6C61.4,34.4,47.3,51.7,30.7,57C14.2,62.4,-4.8,55.9,-16.9,45.9C-29,36,-34.2,22.5,-40,6.4C-45.8,-9.6,-52.2,-28.2,-45.6,-37.1C-39.1,-46,-19.5,-45.2,-1.7,-43.8C16.1,-42.4,32.1,-40.4,44.7,-30.1Z"
							transform="translate(100 100)"
						/>
					</svg>
					<svg className="blob2" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
						<path
							fill="#F7B71E"
							d="M30.3,-30C39.3,-21.3,46.7,-10.6,47.2,0.5C47.7,11.7,41.4,23.3,32.3,33.7C23.3,44,11.7,53.1,-3.5,56.6C-18.7,60.1,-37.4,58.2,-46,47.8C-54.6,37.4,-53.1,18.7,-46.3,6.8C-39.6,-5.1,-27.5,-10.3,-18.9,-19C-10.3,-27.8,-5.1,-40.1,2.8,-42.8C10.6,-45.6,21.3,-38.8,30.3,-30Z"
							transform="translate(100 100)"
						/>
					</svg>

					<nav className="nav-bar">
						<div className="brand">
							<img id="logo" src={logo} alt="Writtery Logo" />
						</div>
						<ul>
							<li id="nav-link">About</li>
							<li id="nav-link">Contact</li>
							<li id="nav-link">Login</li>
						</ul>
					</nav>
					<main>
						<div className="frontpage">
							<img id="bookGirl" className="bookGirl" src={bookGirl} alt="girl holding book" />
							<div className="info">
								<p id="slogin">Express Your Emotions</p>
								<p>Your own personal journal that matches your mood</p>
								<div id="buttonBox">
									<Button text="Join Now" id="join" />
									<Button text="Login" id="login" />
								</div>
							</div>
						</div>
					</main>
					<div className="about">
						<div className="app-info">
							<h2>
								Writtery is a journal that matches your mood with UI changes and spotify intergration!
								Select a mood and the site with change color and filter your music to match your mood
								for the best writing experience.
							</h2>
						</div>
						<div className="icons">
							<img id="musicPic" src={musicPic} alt="Music Icon" />
						</div>
					</div>
					<footer>
						<div className="contact-info">
							Contact me at: msmoawad99@gmail.com<br /> Made By Mark Moawad
						</div>
					</footer>
				</div>
			</div>
		);
	}
}

export default Landing;
