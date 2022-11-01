import { ChakraProvider } from '@chakra-ui/react'
import theme from './assets/theme'
import './assets/index.css'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div>
        Hello
      </div>
    </ChakraProvider>
  )
}

export default App
