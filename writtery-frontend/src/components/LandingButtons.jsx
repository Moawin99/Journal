import React from 'react';
import '../stylesheets/landingButton.css';

const Button = (props) => {
	return (
		<button className="button" id={props.id}>
			<h2>{props.text}</h2>
		</button>
	);
};

export default Button;
