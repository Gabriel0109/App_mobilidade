
import { TripContext } from '../../hooks/useTrips'
import {Button,  FormControl, FormLabel, Input as ChakraInput, Box, Heading, Text, Flex } from '@chakra-ui/react'
import { useContext, useState } from 'react'
import axios from 'axios'
import { FaArrowAltCircleRight } from 'react-icons/fa'

export function SearchInput(){
    const [searchQuery, setSearchQuery] = useState("");
    const [queryResults, setQueryResults] = useState([])
    const { searchHandler } = useContext(TripContext);

    const searchQueryHandler = async () => {
        searchHandler(searchQuery);
        await axios
            .get("https://api.mobilidade.rio/trip/?code=" + searchQuery)
            .then((value) => {
                console.log(value.data.results);
                setQueryResults(value.data.results);
            });
    };

 
    return (
        <>
            <Box>
                <FormLabel htmlFor="trip" textAlign="center">Digite o código do ponto para obter informações:</FormLabel>
                
                <FormControl display="flex" alignItems="center">
                    <ChakraInput
                        name="search-trip"
                        id="searc-tripID"
                        type="search"
                        focusBorderColor='blue.100'
                        bgColor="gray.100"
                        variant="filled"
                        placeholder='Ex: E23A'
                        textTransform="uppercase"
                        _hover={{
                            bgColor: 'gray.100'
                        }}
                        borderRightRadius="0"
                        maxLength='4'
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                    />
                    <Button type="submit" onClick={searchQueryHandler} borderLeftRadius="0" colorScheme='blue'>
                        Buscar
                    </Button>
                </FormControl>
                <Box>
                    {queryResults.map((e) => (
                       
                            <Button w="100%" as="button" h="100%" textAlign="start" size="lg" display="block" py="4"  my="4" bg="#074FA7" color="#fff" _hover={{
                                bgColor: 'blue.400'
                            }} onClick={() => {console.log(e.id)}}>
                                <Heading size="lg" display="block">
                            {e.route.short_name}
                                </Heading>
                                <Flex alignItems="center">
                                <FaArrowAltCircleRight />
                                <Text ms="1">
                                    {e.headsign}
                                </Text>
                                </Flex>
                            </Button>
                    ))}
                
                </Box>
            </Box>
            </>
    )
}