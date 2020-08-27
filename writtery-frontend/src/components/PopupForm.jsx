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
			<>
			<div className="overlay" />
			<div className="login-container">
				<h2 className="popup-text">Login</h2>
				<div className="input-div">
					<label>Username</label>
					<input className="input" type="text" onChange={(e) => setUsername(e.target.value)} />
					<label>Password</label>
					<input className="input" type="password" onChange={(e) => setPassword(e.target.value)} />
					<div className="button-container">
						<button className="button" onClick={props.onClose}>
							Cancel
						</button>
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
			</div>
			</>
		);
	} else if (props.text === 'join') {
		return (
			<>
			<div className="overlay" />
			<div className="join-container">
				<h2 className="popup-text">Register</h2>
				<div className="input-div">
					<label>First Name</label>
					<input className="input" type="text" onChange={(e) => setFirstName(e.target.value)}/>
					<label>Last Name</label>
					<input className="input" type="text" onChange={(e) => setLastName(e.target.value)}/>
					<label>Username</label>
					<input className="input" type="text" onChange={(e) => setUsername(e.target.value)}/>
					<label>Password</label>
					<input className="input" type="password" onChange={(e) => setPassword(e.target.value)}/>
					<div className="button-container">
						<button className="button" onClick={props.onClose}>Cancel</button>
						<button 
						className="button" 
						onClick={() => 
						axios
						.post('http://localhost:8000/register', {
							first_name: firstName,
							last_name: lastName,
							username: username,
							password: password
						})
						.then((res) => {
							console.log(res);
						})
						.catch((err) => {
							console.log(err);
						})}>Register</button>
					</div>
				</div>
			</div>
			</>
		);
	} else {
		return null;
	}
};

export default PopupForm;
