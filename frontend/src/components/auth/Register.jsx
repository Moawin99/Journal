import React, { useState } from 'react';
import { getColors } from '../../utils/getColors';
import { LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FaUser } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import {
	Divider,
	Flex,
	Heading,
	InputGroup,
	InputLeftElement,
	Icon,
	Input,
	Text,
	InputRightElement,
	Button
} from '@chakra-ui/react';
import CustomButton from '../general/CustomButton';
import { useNavigate } from 'react-router-dom';

const Register = ({ color }) => {
	const [ firstName, setFirstName ] = useState('');
	const [ username, setUsername ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const colors = getColors(color);
	const [ showPassword, setShowPassword ] = useState(false);
	const handlePasswordVisibility = () => setShowPassword(!showPassword);
	const handleChange = (event, setter) => setter(event.target.value);
	const navigate = useNavigate();

	return (
		<Flex
			bg={color === 'yellow' || 'red' ? colors.primary : colors.secondary}
			h="100vh"
			justify="center"
			align="center"
		>
			<Flex
				justify="space-between"
				align="center"
				h="85%"
				w="30em"
				direction="column"
				p="5em"
				bg={colors.btnColor}
				color={colors.btnText}
				borderRadius="10px"
			>
				<Heading>Sign Up!</Heading>
				<Divider borderWidth="3px" borderRadius="5px" borderColor={colors.btnText} />
				<Flex direction="column" w="100%" h="25rem" justify="space-evenly">
					{createFormInput({
						text: 'First Name',
						setter: setFirstName,
						value: firstName,
						icon: FaUser,
						handler: handleChange
					})}
					{createFormInput({
						text: 'Email',
						setter: setEmail,
						value: email,
						icon: HiOutlineMail,
						handler: handleChange
					})}
					{createFormInput({
						text: 'Username',
						setter: setUsername,
						value: username,
						icon: FaUser,
						handler: handleChange
					})}
					{createPasswordInput({
						text: 'Password',
						setter: setPassword,
						value: password,
						icon: LockIcon,
						handler: handleChange,
						handlePassword: handlePasswordVisibility,
						showPassword: showPassword
					})}
				</Flex>
				<CustomButton color={color} text="Register" routePath="/" />
				<Text cursor="pointer" width="100%" onClick={() => navigate('/login')}>
					Login
				</Text>
			</Flex>
		</Flex>
	);
};

const createFormInput = ({ text, setter, value, icon, handler }) => {
	return (
		<Flex direction="column" w="100%" h="15rem" justify="space-evenly">
			<Text alignSelf="start" fontSize="2xl">
				{text}
			</Text>
			<InputGroup>
				<InputLeftElement pointerEvents="none">{loadProfileIcon(icon)}</InputLeftElement>
				<Input value={value} onChange={(e) => handler(e, setter)} size={'lg'} borderColor={'black'} />
			</InputGroup>
		</Flex>
	);
};

const createPasswordInput = ({ text, setter, value, icon, handler, handlePassword, showPassword }) => {
	return (
		<Flex direction="column" w="100%" h="15rem" justify="space-evenly">
			<Text alignSelf="start" fontSize="2xl">
				{text}
			</Text>
			<InputGroup>
				<InputLeftElement pointerEvents="none" children={loadProfileIcon(icon)} />
				<Input
					type={showPassword ? 'text' : 'password'}
					value={value}
					onChange={(e) => handler(e, setter)}
					size={'lg'}
					borderColor={'black'}
				/>
				<InputRightElement width="3rem">
					<Button
						h="1.5rem"
						size="sm"
						onClick={handlePassword}
						background={'inherit'}
						_hover={{ opacity: 0.4 }}
					>
						{showPassword ? <ViewOffIcon /> : <ViewIcon />}
					</Button>
				</InputRightElement>
			</InputGroup>
		</Flex>
	);
};

const loadProfileIcon = (icon) => {
	return <Icon as={icon} />;
};

export default Register;
