import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { getColors } from '../../utils/getColors';

const LandingSummary = ({ color }) => {
	const colors = getColors(color)

	return (
		<Flex
		w='100%'
		bg={colors.secondary}
		justify='space-between'
		p={'4rem'}
		>
			<Flex>
				Place holder
			</Flex>
			<Flex
			w='50%'>
				<Text fontSize={'2xl'} color='black'>
					Writtery is a journal that matches your mood with UI changes and Spotify intergration! 
					Select a mood and the site will change color and filter your music to match your mood
					for the best writing experience.
				</Text>
			</Flex>
		</Flex>
	)
}

export default LandingSummary