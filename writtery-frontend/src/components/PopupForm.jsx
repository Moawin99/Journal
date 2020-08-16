import React from 'react';

const PopupForm = (props) => {
	if (props.text === 'login') {
		return (
			<div className="popup-container">
				<h2 className="popup-text">Login</h2>
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
