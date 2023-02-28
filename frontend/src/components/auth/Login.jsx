import React from 'react';
import { Button, Flex, Heading, Divider, Text, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons'
import { getColors } from '../../utils/getColors';
import { useState } from 'react';

const Login = ({ color }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const colors = getColors(color)
	const handleChange = (event, setter) => setter(event.target.value)

	return (
		<Flex
		bg={color === 'yellow' ? colors.primary : colors.secondary}
		h='100vh'
		justify='center'
		align='center'>
			<Flex
			justify='space-between'
			align='center'
			h='40em'
			w='30em'
			direction='column'
			p='5em'
			bg={colors.btnColor}
			color={colors.btnText}
			borderRadius='10px'
			>
				<Heading> Welcome Back!</Heading>
				<Divider borderWidth='3px' borderRadius='5px' borderColor={colors.btnText} />
				<Flex 
				direction='column'
				w='100%'
				h='15rem'
				justify='space-evenly'>
					<Flex w='100%' direction='column'>
						<Text alignSelf='start' fontSize='2xl'>Email</Text>
						<InputGroup>
							<InputLeftElement
							pointerEvents='none'
							children={<EmailIcon />}
							/>
							<Input
							value={email}
							onChange={(e) => handleChange(e, setEmail)}
							size={'lg'}
							borderColor={'black'}
							/>
						</InputGroup>
					</Flex>
					<Flex w='100%' direction='column'>
						<Text alignSelf='start' fontSize='2xl'>Password</Text>
						<InputGroup>
							<InputLeftElement
							pointerEvents='none'
							children={<LockIcon />}
							/>
							<Input
							type='password'
							value={password}
							onChange={(e) => handleChange(e, setPassword)}
							size={'lg'}
							borderColor={'black'}
							/>
						</InputGroup>
					</Flex>

				</Flex>
				<Flex 
				w='100%'
				direction='column'>
					<Button w='100%' color={colors.text} colorScheme={color}>Login</Button>
					<Text>Register</Text>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Login