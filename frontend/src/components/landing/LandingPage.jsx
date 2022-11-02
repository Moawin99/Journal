import { Box, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import { getColors } from '../../utils/getColors'
import logo from '../../assets/icons/WritteryLogo.png'
import * as book_girl_pictures from '../../assets/pictures'

const LandingPage = ({ color }) => {
    const colors = getColors(color)

    return (
        <Flex
        flexDir='row'
        h='100vh'
        w='100vw'
        bg={colors.primary}
        position={'relative'}
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
                w={'25%'}
                justify={'space-between'}
                h={'min'}
                >
                    <p href='#about'>About</p>
                    <p href='#contact'>Contact</p>
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