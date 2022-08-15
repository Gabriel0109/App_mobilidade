import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { TripProvider } from './hooks/useTrips'
import { RoutingProvider } from './hooks/useRoutes'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './styles/theme'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <TripProvider>
      <RoutingProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </RoutingProvider>

    </TripProvider>
  </React.StrictMode>
)
