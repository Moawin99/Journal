import React from 'react';
import { getColors } from '../../utils/getColors';
import logo from '../../assets/icons/WritteryLogo.png';
import { blue_girl, yellow_girl, gray_girl, red_girl, green_girl } from '../../assets/pictures';
import { Flex, Image, Button, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const LandingPage = ({ color }) => {
	const colors = getColors(color);
	const navigate = useNavigate();
	let pic_color;
	if (color == 'yellow') {
		pic_color = yellow_girl;
	} else if (color == 'blue') {
		pic_color = blue_girl;
	} else if (color == 'gray') {
		pic_color = gray_girl;
	} else if (color == 'red') {
		pic_color = red_girl;
	} else {
		pic_color = green_girl;
	}

	return (
		<Flex flexDir="column" h="100vh" w="100%" bg={colors.primary} color={colors.text} position="relative">
			<Flex p="2em" w={'100%'} h={'8rem'} justify={'space-between'} align={'center'}>
				<Image src={logo} alt="Logo" h={'4em'} />
				<Flex w={'10rem'} justify={'space-between'} h={'min'}>
					<p href="#about">About</p>
					<p href="#contact">Contact</p>
				</Flex>
			</Flex>

			<Flex
				w="100%"
				h="80%"
				justify="flex-end"
				align="center"
				direction={[ 'column-reverse', 'column-reverse', 'row', 'row' ]}
			>
				<Flex w="50%" justify="center" align="center">
					<Flex
						className="slogan-container"
						h="15rem"
						w="80%"
						flexDir="column"
						justify="center"
						align="flex-start"
					>
						<Heading size={[ '2xl', '2xl', '4xl', '4xl' ]}>Express Your Emotions</Heading>
						<Text fontSize={[ 'x-large', 'x-large', '2xl', '2xl' ]}>
							Your own personal journal that matches your mood
						</Text>
						<Flex w="70%" h="4rem" justify="space-between" align="center">
							<Button onClick={() => navigate('/register')} bg={colors.secondary} w="45%" color={'black'}>
								Join Now
							</Button>
							<Button
								onClick={() => navigate('/login')}
								bg={colors.btnColor}
								w="45%"
								color={colors.btnText}
							>
								Login
							</Button>
						</Flex>
					</Flex>
				</Flex>
			</Flex>

			<Image src={pic_color} alt="girl reading a book" pos="absolute" bottom={0} left={0} />
		</Flex>
	);
};

export default LandingPage;
