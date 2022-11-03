import React from 'react';
import { getColors } from '../../utils/getColors'
import logo from '../../assets/icons/WritteryLogo.png'
import * as book_girl_pictures from '../../assets/pictures'
import { 
    Flex, 
    Image, 
    Button, 
    Heading, 
    Text } from '@chakra-ui/react';

const LandingPage = ({ color }) => {
    const colors = getColors(color)

    return (
        <Flex
        flexDir='column'
        h='100vh'
        w='100vw'
        bg={colors.primary}
        position={'relative'}
        color={colors.text}
        >
            <Flex
            p='2em'
            w={'100%'}
            h={'8rem'}
            justify={'space-between'}
            align={'center'}>
                <Image src={logo} alt='Logo' h={'4em'}
                 />
                <Flex
                w={'10rem'}
                justify={'space-between'}
                h={'min'}
                >
                    <p href='#about'>About</p>
                    <p href='#contact'>Contact</p>
                </Flex>
            </Flex>

            <Flex
            w='100%'
            h='80%'
            justify='flex-end'
            align='center'
            >

                <Flex
                w='50%'
                justify='center'
                align='center'
                >
                    <Flex
                    className='slogan-container'
                    h='15rem'
                    w='80%'
                    flexDir='column'
                    justify='center'
                    align='flex-start'
                    >
                        <Heading noOfLines={2} size='3xl'>Express Your Emotions</Heading>
                        <Text fontSize='2xl'>Your own personal journal that matches your mood</Text>
                        <Flex
                        w='70%'
                        h='4rem'
                        justify='space-between'
                        align='center'
                        >
                            <Button bg={colors.secondary} w='45%' color={'black'}>
                                Join Now
                            </Button>
                            <Button bg={colors.btnColor} w='45%' color={colors.btnText}>
                                Login
                            </Button>

                        </Flex>
                    </Flex>
                </Flex>

            </Flex>


            <Image src={`book_girl_pictures.${color}_girl`} 
            alt='girl reading a book'
            pos='absolute'
            bottom={0}
            left={0} />
        </Flex>
    )
}

export default LandingPage;