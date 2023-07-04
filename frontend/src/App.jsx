import { Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './assets/theme';
import Login from './components/auth/Login';
import Landing from './components/landing/Landing';
import Register from './components/auth/Register';
import Container from './components/general/Container';

function App() {
	return (
		<ChakraProvider theme={theme}>
			<Routes>
				<Route path="/" element={<Landing color="yellow" />} />
				<Route path="/login" element={<Login color="yellow" />} />
				<Route path="/register" element={<Register color="yellow" />} />
				<Route path="/home" element={<Container color="yellow" />} />
			</Routes>
		</ChakraProvider>
	);
}

export default App;
