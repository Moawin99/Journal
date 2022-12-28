import { ChakraProvider } from '@chakra-ui/react'
import theme from './assets/theme'
import Landing from './components/landing/Landing'
import LandingPage from './components/landing/LandingPage'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Landing color={'green'} />
    </ChakraProvider>
  )
}

export default App
