import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const PopupForm = (props) => {
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	if (props.text === 'login') {
		return (
			<div className="popup-container">
				<h2 className="popup-text">Login</h2>
				<form>
					<label>Username</label>
					<input type="text" onChange={(e) => setUsername(e.target.value)} />
					<label>Password</label>
					<input type="text" onChange={(e) => setPassword(e.target.value)} />
					<input
						type="submit"
						value="Login"
						onClick={() =>
							axios
								.post('/login', {
									username: username,
									password: password
								})
								.then((res) => {
									console.log(res);
								})
								.catch((error) => {
									console.log(error);
								})}
					/>
				</form>
			</div>
		);
	} else {
		return (
			<div className="popup-container">
				<h2 className="popup-text">Register</h2>
			</div>
		);
	}
};

export default PopupForm;
