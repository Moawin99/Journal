import { ChakraProvider } from '@chakra-ui/react'
import theme from './assets/theme'
import LandingPage from './components/landing/LandingPage'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <LandingPage color={'green'} />
    </ChakraProvider>
  )
}

export default App
