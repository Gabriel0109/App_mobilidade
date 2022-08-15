import {FaArrowAltCircleRight } from 'react-icons/fa'
import {Heading, Text, Flex, Button } from "@chakra-ui/react"
import { useState } from 'react'
export function SearchItem(props){
    const [route, setRoute] = useState('')
    return (   
    <>
        <Button w="100%" as="button" h="100%" textAlign="start" size="lg" display="block" py="4" my="4" bg="#074FA7" color="#fff" _hover={{
            bgColor: 'blue.400'
        }} onClick={() => { console.log(props.info.id); setRoute(props.info.id)}}>
            <Heading size="lg" display="block">
                {props.info.route.short_name}
            </Heading>
            <Flex alignItems="center">
                <FaArrowAltCircleRight />
                <Text ms="1"  fontSize="md" fontWeight="300">
                    {props.info.route.vista}
                </Text>
            </Flex>
        </Button>
    </>)
}