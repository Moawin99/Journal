import React, { Component } from 'react';
import '../stylesheets/global.css';
import Hamburger from './Hamburger';
import '../stylesheets/mainpage.css';
import logo from '../pictures/WritteryLogo.png';
import whiteLogo from '../pictures/WhiteWritteryLogo.png';
import Navbar from './navBar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MainPage = (props) => {
	return (
		<div className="App">
			<div className="home">
				<Navbar />
				<div className="card-container" />
			</div>
		</div>
	);
};

export default MainPage;
