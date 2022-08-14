import { Box, Flex, Image, Input, InputGroup, InputLeftElement, Stack, Text } from '@chakra-ui/react'
import { useContext, useEffect } from 'react'
import logo from '../assets/logo.png'
import { TripContext } from '../hooks/useTrips'

export function Header() {
 
    
    return (<>
        <Flex
            as="header"
            margin="0 auto"
            p={4}
            alignItems="center"

    
            >
            <Flex width={{ base: "80%", lg: '15%' }} borderEnd="1px" borderColor="#fff">

                    <a href='/'>
                        <img src={logo} width="85%" alt="Magnun Courses" />
                    </a>
                
            </Flex>
            <Text textTransform="uppercase" color="#fff" ms={2} fontWeight="700">
                Transportes
            </Text>
        </Flex>
    </>
    )
}