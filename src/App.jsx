import { useState } from 'react'
import './App.css'
import { theme } from './styles/theme'
import { Header } from './components/Header'
import {ChakraProvider} from '@chakra-ui/react'
import { Box, Button, Flex, Heading, Text, FormControl, FormLabel, Input as ChakraInput, } from '@chakra-ui/react'
import { TripProvider } from './hooks/useTrips'

function App() {

  return (
    <TripProvider>
        <ChakraProvider theme={theme}>
          <Header />
        <Flex alignItems="center" h="50vh">
            <Flex width={{ base: "80%", xl: '67%' }} borderRadius={8} bgColor="#fff" m="0 auto" py="4rem" alignItems="center" flexDirection="column">
              <Box maxW='32rem'>
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
              
              />
              <Button type="submit" borderLeftRadius="0" colorScheme='blue'>
                Buscar
              </Button>
            </FormControl>
                <Text fontSize='xl'>
                  Paystack helps businesses in Africa get paid by anyone, anywhere in the
                  world
                </Text>
              </Box>
            </Flex>
        </Flex>
        </ChakraProvider>
    </TripProvider>
  )
}

export default App
