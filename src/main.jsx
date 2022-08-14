import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { TripProvider } from './hooks/useTrips'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './styles/theme'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TripProvider>
    <ChakraProvider theme={theme}>
    <App />
    </ChakraProvider>
    </TripProvider>
  </React.StrictMode>
)
