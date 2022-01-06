import React from 'react';
import { useState } from 'react';
import Whitelogo from '../pictures/WhiteWritteryLogo.png';
import Blacklogo from '../pictures/WritteryLogo.png';
import Hamburger from './Hamburger';
import '../stylesheets/navBar.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const Navbar = (props) => {
	const [logo, setRightLogo] = useState();
	const [userInfo, setUserinfo] = useState();
	const mood = useSelector((state) => state.mood.value);
	const dispatch = useDispatch();
	let navStyle = "navContainer " + "nav" + mood;
	
	return (
		<nav className={navStyle}>
			<Hamburger />
			<img className="logo" src={Whitelogo} />
			<h1>Welcome User</h1>
		</nav>
	);
};


export default Navbar;