import React, { useState } from 'react';
import registerPic from '../pictures/registerPic.svg';

const Register = () => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();

	return (
		<div className="page-container">
			<div>
				<img src={registerPic} className="loginPic" />
				<div>
					<h2>Create Account</h2>
					<div className="input-container">
						<input placeholder="First Name" type="text" />
						<input placeholder="Last Name" type="text" />
						<input placeholder="Email" type="text" />
						<input placeholder="Password" type="password" />
					</div>
				</div>
			</div>
		</div>
	)
};

export default Register;