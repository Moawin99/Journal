import React from 'react';
import { useState } from 'react';
import Whitelogo from '../pictures/WhiteWritteryLogo.png';
import Blacklogo from '../pictures/WritteryLogo.png';
import Hamburger from './Hamburger';
import '../stylesheets/navBar.css';

const Navbar = (props) => {
	const [logo, setRightLogo] = useState();
	const [userInfo, setUserinfo] = useState();
	
	return (
		<nav className="mood navContainer">
			<Hamburger />
			<img src={Whitelogo} />
			<h1>Welcome User</h1>
		</nav>
	);
};


export default Navbar;