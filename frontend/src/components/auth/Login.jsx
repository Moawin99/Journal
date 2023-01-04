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
		h='100%'
		justify='center'
		align='center'>
			<Grid templateColumns='1fr'>
				<GridItem colSpan={2}><Heading>Login</Heading></GridItem> 
				<GridItem colSpan={2}>
					<Grid templateColumns='1fr 1fr' bg={colors.btnColor} color={colors.btnText}>
						<GridItem colSpan={2}>
							<FormControl>
								<FormLabel htmlFor='email'>Email</FormLabel>
								<Input id='email' type='email' />
							</FormControl>
						</GridItem>
					</Grid>
				</GridItem>
			</Grid>
		</Flex>
	)
}

export default Login