import React, { useState } from 'react';
import "../stylesheets/login.css";
import loginPic from '../pictures/loginPic.svg';

const Login = () => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	return(
	<div className="page-container"> 
		<div className="login-box">
			<img src={loginPic} className="loginPic"/>
			<div className="login-info">
				<h2 className="login-title">User Login</h2>
				<div className="input-container">
					<input placeholder="email" className="input-field email" onChange={(e) => setEmail(e.target.value)} type="text" />
					<input placeholder="password"className="input-field password" onChange={(e) => setPassword(e.target.value)} type="password" />
				</div>
				<button className="loginBtn">Login</button>
				<p>Create an Account</p> {/**To be wrapped with route tag to take to register page */}
			</div>
		</div>
	</div>
	)};

export default Login;