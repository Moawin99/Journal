import React from 'react';
import "../stylesheets/login.css";
import loginPic from '../pictures/loginPic.svg';

const Login = () => {
	return(
	<div className="page-container"> 
		<div className="login-box">
			<img src={loginPic} className="loginPic"/>
			<div className="login-info">
				<h2>User Login</h2>
			</div>
		</div>
	</div>
	)};

export default Login;