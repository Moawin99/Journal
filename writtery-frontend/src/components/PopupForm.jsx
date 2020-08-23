import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import '../stylesheets/popupForm.css';

const PopupForm = (props) => {
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');

	if (props.text === 'login') {
		return (
			<div className="popup-container">
				<h2 className="popup-text">Login</h2>
				<div>
					<label>Username</label>
					<input type="text" onChange={(e) => setUsername(e.target.value)} />
					<label>Password</label>
					<input type="password" onChange={(e) => setPassword(e.target.value)} />
					<button
						className="button"
						onClick={() =>
							axios
								.post('http://localhost:8000/login', {
									username: username,
									password: password
								})
								.then((res) => {
									console.log(res);
								})
								.catch((error) => {
									console.log(error);
								})}
					>
						Login
					</button>
				</div>
			</div>
		);
	} else if (props.text === 'join') {
		return (
			<div className="popup-container">
				<h2 className="popup-text">Register</h2>
			</div>
		);
	} else {
		return null;
	}
};

export default PopupForm;
