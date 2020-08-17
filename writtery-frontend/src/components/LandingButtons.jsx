import React from 'react';
import '../stylesheets/landingButton.css';
import PopupForm from './PopupForm';

const Button = (props) => {
	return (
		<button className="button" id={props.id} onClick={() => <PopupForm text="login" />}>
			<h2>{props.text}</h2>
		</button>
	);
};

export default Button;
