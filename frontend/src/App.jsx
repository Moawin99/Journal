import {
  Route,
  Routes
} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './assets/theme'
import Login from './components/auth/Login'
import Landing from './components/landing/Landing'
import LandingPage from './components/landing/LandingPage'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Landing color='red' />} />
        <Route path='/login' element={<Login color='red' />} />
      </Routes>
    </ChakraProvider>
  )
}

export default App
