import React from 'react';
import { useState } from 'react';
import Whitelogo from '../pictures/WhiteWritteryLogo.png';
import Blacklogo from '../pictures/WritteryLogo.png';
import Hamburger from './Hamburger';
import '../stylesheets/navBar.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
	const [ logo, setRightLogo ] = useState();
	const [ userInfo, setUserinfo ] = useState();
	const mood = useSelector((state) => state.mood.value);
	const user = useSelector((state) => state.user.data);
	const dispatch = useDispatch();

	return (
		<nav className={`navContainer nav${mood}`}>
			<Hamburger />
			<img className="logo" src={Whitelogo} />
			<h1 className="white">Welcome {user ? user.first_name : 'User'}</h1>
			<Link to="/entry">Entries!</Link>
		</nav>
	);
};

export default Navbar;
