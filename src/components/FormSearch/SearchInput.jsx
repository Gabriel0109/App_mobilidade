
import { TripContext } from '../../hooks/useTrips'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import { useDisclosure } from '@chakra-ui/react'
import {
    Button, FormControl, FormLabel, Input as ChakraInput, Box, Heading, Flex, Text, Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton, } from '@chakra-ui/react'
import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { Map } from '../Map/Map'
import { RoutingContext } from '../../hooks/useRoutes'

export function SearchInput() {
    const [searchQuery, setSearchQuery] = useState("");
    const [queryResults, setQueryResults] = useState([])
    const { searchHandler} = useContext(TripContext);
    const {route, setRoute} = useContext(RoutingContext)
    const { isOpen, onOpen, onClose } = useDisclosure()

    // FAZER PESQUISA DE ACORDO COM CÓDIGO INSERIDO
    const searchQueryHandler = async () => {
        searchHandler(searchQuery);
        await axios
            .get("https://api.mobilidade.rio/trip/?code=" + searchQuery.toUpperCase())
            .then((value) => {
                setQueryResults(value.data.results);
            });
    };

    // ENVIAR AO APERTAR ENTER
    const handleSubmit = () => {
        searchQueryHandler()
     };

  useEffect(() => {
    const keyDownHandler = event => {

      if (event.key === 'Enter') {
        event.preventDefault();
        handleSubmit();
      }
    };

    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [searchQuery]);

    return (
        <>
            <Box>
           <form onSubmit={handleSubmit}>
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
                         autoComplete="off"
                     />
                     <Button type="submit" onClick={searchQueryHandler} borderLeftRadius="0" colorScheme='blue'>
                         Buscar
                     </Button>
                 </FormControl>
           </form>
                
                <Box>
                    {/* RESULTADOS DA PESQUISA DO CÓDIGO */}
                    {queryResults.map((e) => {
                        return <Button key={e.id} w="100%" as="button" h="100%" textAlign="start" size="lg" display="block" py="4" my="4" bg="#074FA7" color="#fff" _hover={{
                            bgColor: 'blue.400'
                        }} onClick={() => { setRoute(e.id); onOpen() }}>
                            <Heading size="lg" display="block">
                                {e.route.short_name}
                            </Heading>
                            <Flex alignItems="center">
                                <Text ms="1" fontSize="md" whiteSpace="normal" fontWeight="300">
                                    {e.route.vista}
                                </Text>
                            </Flex>
                        </Button>
                    })}
                     {/* MODAL COM MAPA */}
                    <Modal  isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                  
                        <ModalContent mx={2}>
                            <ModalCloseButton />
                            <ModalBody>
                                <Map route_id={route} />
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </Box>
            </Box>
        </>
    )
}