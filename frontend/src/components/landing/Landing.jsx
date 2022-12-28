import React from 'react';
import LandingPage from './LandingPage';
import LandingSummary from './LandingSummary';

const Landing = ({ color }) => {
	return (
		<>
			<LandingPage color={color} />
			<LandingSummary color={color} />
		</>
	)
}

export default Landing