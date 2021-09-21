import React from 'react';
import '../stylesheets/landingButton.css';
import { Link } from 'react-router-dom';

const Button = (props) => {
	return (
		<>
		<Link className="linkbox" to={props.to}>
			<button className="button" id={props.id}>
				<h2>{props.text}</h2>
			</button>
		</Link>
		</>
	);
};

export default Button;
