import React from 'react';
import LandingPage from './LandingPage';
import LandingSummary from './LandingSummary';
import { Flex } from '@chakra-ui/react';

const Landing = ({ color }) => {
	return (
		<Flex
		h='100%'
		w='100%'
		flexDir='column'>
			<LandingPage color={color} />
			<LandingSummary color={color} />
		</Flex>
	)
}

export default Landing