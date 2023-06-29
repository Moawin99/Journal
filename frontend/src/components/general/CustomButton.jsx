import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { getColors } from '../../utils/getColors';

const CustomButton = ({ color, text, onClick, routePath }) => {
	const navigate = useNavigate();
	const colors = getColors(color);

	const handleOnClick = async () => {
		if (onClick) {
			onClick();
		}

		if (routePath) {
			navigate(routePath);
		}
	};

	return (
		<Button w="100%" onClick={handleOnClick} color={colors.text} colorScheme={color}>
			{text}
		</Button>
	);
};

export default CustomButton;
