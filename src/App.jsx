import { SearchInput } from './components/FormSearch/SearchInput'
import './App.css'
import { Header } from './components/Header'
import { Box,  Flex, } from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { TripContext } from './hooks/useTrips'




function App() {
  const {handleSearch} = useContext(TripContext)
  return (
<>
          <Header />
          <Flex alignItems="center" mt="5">
              <Flex width={{ base: "90%", xl: '67%' }} borderRadius={8} bgColor="#fff" m="0 auto" py="4rem" alignItems="center" flexDirection="column">
              <Box px="4" w="90%">
                  <SearchInput search={handleSearch} />
                </Box>
              </Flex>
        </Flex>
        </>
  )
}

export default App
