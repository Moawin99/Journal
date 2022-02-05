import React, { useState } from 'react';
import "../stylesheets/login.css";
import loginPic from '../pictures/loginPic.svg';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/users';


const Login = () => {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [isLoggedin, setIsLoggedin] = useState(false);
	const [failedLogin, setFailedLogin] = useState(0);
	const user = useSelector((state) => state.user.data);
	const dispatch = useDispatch();

	async function onPressLogin() {
		const res = await Axios
		.post("/v1/users/login", {
			username: username,
			password: password
		})
		.catch((err) => err);
		if(res.status === 200){
			setIsLoggedin(true);
			let userData = {
				id: res.data.user.id,
				first_name: res.data.user.first_name,
				last_name: res.data.user.last_name,
				username: res.data.user.username
			};
			dispatch(login(userData));
		}
		else{
			setIsLoggedin(false);
		}
		if(res.status !== 200) setFailedLogin(failedLogin + 1);
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