import React, { useState } from 'react';
import registerPic from '../pictures/registerPic.svg';
import '../stylesheets/register.css';

const Register = () => {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [isregistered, setIsRegistered] = useState(false);

	async function onPressRegister(){
	}

	return (
		<div className="page-container">
			<div className="register-container">
				<img src={registerPic} className="loginPic" />
				<div className="register-info">
					<h2>Create Account</h2>
					<div className="input-container">
						<input placeholder="First Name" type="text" />
						<input placeholder="Last Name" type="text" />
						<input placeholder="Username" type="text" />
						<input placeholder="Password" type="password" />
					</div>
					<button>Register</button>
				</div>
			</div>
		</div>
	)
};

export default Register;