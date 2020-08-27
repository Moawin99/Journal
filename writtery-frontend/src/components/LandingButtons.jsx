import React from 'react';
import '../stylesheets/landingButton.css';
import PopupForm from './PopupForm';
import { useState } from 'react';

const Button = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
		<button className="button" id={props.id} onClick={() => setIsOpen(prev => !prev)}>
			<h2>{props.text}</h2>
		</button>
		{isOpen ? 
		<PopupForm text={props.id} onClose={() => setIsOpen(false)} /> : null}
		</>
	);
};

export default Button;
