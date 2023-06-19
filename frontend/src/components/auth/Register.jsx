import React, { useState } from 'react';
import { getColors } from '../../utils/getColors';
import { FaUser } from 'react-icons/fa'
import { Divider, Flex, Heading, InputGroup, InputLeftElement, Icon, Input, Text } from '@chakra-ui/react';

const Register = ({ color }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
	const colors = getColors(color)
	const [showPassword, setShowPassword] = useState(false);
	const handlePasswordVisibility = () => setShowPassword(!showPassword);
    const handleChange = (event, setter) => setter(event.target.value);

    return (
        <Flex
		bg={color === 'yellow' || 'red' ? colors.primary : colors.secondary}
		h='100vh'
		justify='center'
		align='center'
        >

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
                    <Heading>Sign Up!</Heading>
                    <Divider borderWidth='3px' borderRadius='5px' borderColor={colors.btnText} />

                <Flex 
                direction='column'
                w='100%'
                h='15rem'
                justify='space-evenly'
                >
                    <Text alignSelf='start' fontSize='2xl'>First Name</Text>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            {loadProfileIcon()}
                        </InputLeftElement>
                        <Input
                        value={firstName}
                        onChange={(e) => handleChange(e, setFirstName)}
                        size={'lg'}
                        borderColor={'black'}
                        />
                    </InputGroup>
                </Flex>
            </Flex>

        </Flex>
    )

}

const loadProfileIcon = () => {
	return <Icon as={FaUser} />;
}

export default Register