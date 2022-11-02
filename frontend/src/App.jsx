import { ChakraProvider } from '@chakra-ui/react'
import theme from './assets/theme'
import LandingPage from './components/landing/LandingPage'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <LandingPage color={'yellow'} />
    </ChakraProvider>
  )
}

export default App
