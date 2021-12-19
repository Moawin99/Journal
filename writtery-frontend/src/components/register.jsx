import axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import registerPic from '../pictures/registerPic.svg';
import '../stylesheets/register.css';

const Register = () => {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [isregistered, setIsRegistered] = useState(false);
	const [failedRegister, setFailedRegister] = useState(0);

	async function onPressRegister(){
		const data = await axios
		.post("http://localhost:8000/v1/users", {
			username: username,
			password: password,
			first_name: firstName,
			last_name: lastName
		}).catch((err) => err);
		console.log(data);
		data.status === 201 ? setIsRegistered(true) : setIsRegistered(false);
		if(data.status !== 201) setFailedRegister(failedRegister + 1);
	}

	return (
		<div className="page-container">
			<div className="register-container">
				<img src={registerPic} className="loginPic" />
				<div className="register-info">
					<h2>Create Account</h2>
					<div className="input-container">
						<input className="input firstName" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} type="text" />
						<input className="input lastName" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} type="text" />
						<input className="input username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} type="text" />
						<input className="input password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} type="password" />
					</div>
					<button onClick={() => onPressRegister()} className="registerButton">Register</button>
					{failedRegister > 0 ? <p className="invalid">Failed to Create Account</p> : null}
				</div>
			</div>
			{isregistered ? <Redirect to="/home" /> : null}
		</div>
	)
};

export default Register;