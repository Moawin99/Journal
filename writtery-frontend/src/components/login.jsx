import React, { useState } from 'react';
import "../stylesheets/login.css";
import loginPic from '../pictures/loginPic.svg';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';


const Login = () => {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [isLoggedin, setIsLoggedin] = useState(false);
	const [failedLogin, setFailedLogin] = useState(0);

	async function onPressLogin() {
		const data = await Axios
		.post("http://localhost:8000/v1/users/login", {
			username: username,
			password: password
		})
		.catch((err) => err);
		data.status === 200 ? setIsLoggedin(true) : setIsLoggedin(false);
		if(data.status !== 200) setFailedLogin(failedLogin + 1);
	}

	return(
	<div className="page-container"> 
		<div className="login-box">
			<img src={loginPic} className="loginPic"/>
			<div className="login-info">
				<h2 className="login-title">User Login</h2>
				<div className="input-container">
					<input placeholder="username" className="input-field username" onChange={(e) => setUsername(e.target.value)} type="text" />
					<input placeholder="password"className="input-field password" onChange={(e) => setPassword(e.target.value)} type="password" />
				</div>
				<button onClick={() => onPressLogin()} className="loginBtn">Login</button>
				<Link className="register-link" to="/register"><p>Create an Account</p></Link> 
				{failedLogin > 0 ? <p className="invalid">Invalid Credintals</p> : null}
			</div>
		</div>
		{isLoggedin ? (<Redirect to="/home" />): null}
	</div>
	)};

export default Login;