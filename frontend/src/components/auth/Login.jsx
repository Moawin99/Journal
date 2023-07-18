import React from 'react';
import { Button, Flex, Heading, Divider, Text, Input, InputGroup, InputLeftElement, InputRightElement, Icon } from '@chakra-ui/react';
import { LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { getColors } from '../../utils/getColors';
import { useState } from 'react';
import axios from 'axios';
import CustomButton from '../general/CustomButton';

const Login = ({ color }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const colors = getColors(color)
	const handleChange = (event, setter) => setter(event.target.value)
	const [showPassword, setShowPassword] = useState(false);
	const handlePasswordVisibility = () => setShowPassword(!showPassword);

	const onSubmit = async () => {
		const response = axios.post('http://localhost:8000/v1/login', {
			username,
			password
		});

		console.log({ response });
	}

	return (
		<Flex
		bg={color === 'yellow' || 'red' ? colors.primary : colors.secondary}
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
						<Text alignSelf='start' fontSize='2xl'>Username</Text>
						<InputGroup>
							<InputLeftElement pointerEvents='none'>
								{loadProfileIcon()}
							</InputLeftElement>
							<Input
							value={username}
							onChange={(e) => handleChange(e, setUsername)}
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
							type={showPassword ? 'text' : 'password'}
							value={password}
							onChange={(e) => handleChange(e, setPassword)}
							size={'lg'}
							borderColor={'black'}
							/>
							 <InputRightElement width="3rem">
								<Button h="1.5rem" size="sm" onClick={handlePasswordVisibility} background={'inherit'} _hover={{ opacity: .4 }}>
									{showPassword ? <ViewOffIcon /> : <ViewIcon />}
								</Button>
							</InputRightElement>
						</InputGroup>
					</Flex>

				</Flex>
				<Flex 
				w='100%'
				direction='column'>
					{/* <Button w='100%' color={colors.text} colorScheme={color}>Login</Button>
					<Link to='/register'>Register</Link> */}
					<CustomButton color={color} text={'Login'} routePath={'/'} onClick={onSubmit} />
				</Flex>
			</Flex>
		</Flex>
	)
}

const loadProfileIcon = () => {
	return <Icon as={FaUser} />;
}

export default Login