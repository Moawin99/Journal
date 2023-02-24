import React from 'react';
import { Grid, GridItem, Heading, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { getColors } from '../../utils/getColors';
import { Flex } from '@chakra-ui/react';

const Login = ({color}) => {
	const colors = getColors(color)
	return (
		<Flex
		bg={colors.primary}
		w='100%'
		h='100vh'
		justify='center'
		align='center'>
			<Grid 
			templateColumns='1fr' 
			bg={colors.btnColor}
			p={'2em'}
			borderRadius={'20px'}
			>
				<GridItem colSpan={2}> <Heading>Login</Heading> </GridItem> 
				<GridItem colSpan={2}>
					<Grid templateColumns='1fr 1fr' color={colors.btnText}>
						<GridItem colSpan={2}>
							<FormControl>
								<FormLabel htmlFor='email'>Email</FormLabel>
								<Input bg={colors.secondary} id='email' type='email' />
							</FormControl>
						</GridItem>
					</Grid>
				</GridItem>
			</Grid>
		</Flex>
	)
}
//Very import code that i need to pull from the "Cloud" 😉

export default Login