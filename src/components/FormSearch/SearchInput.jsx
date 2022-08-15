
import { TripContext } from '../../hooks/useTrips'
import {Button,  FormControl, FormLabel, Input as ChakraInput, Box } from '@chakra-ui/react'
import { useContext, useState } from 'react'
import axios from 'axios'
import { SearchItem } from './SearchItems'

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
                    {queryResults.map((e) => {
                       return <SearchItem key={e.id} info={e} />
                    })}
                
                </Box>
            </Box>
            </>
    )
}