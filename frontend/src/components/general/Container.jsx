import React from 'react';
import { getColors } from '../../utils/getColors';
import { Box } from '@chakra-ui/react';

const Container = ({ color, children }) => {
	const colors = getColors(color);
	return (
		<Box bg={colors.primary} h="100vh" w="100%" display="flex">
			{children}
		</Box>
	);
};

export default Container;
