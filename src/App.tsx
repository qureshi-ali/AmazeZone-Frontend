import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/Main';
import Navbar from './components/Navbar';
import PrivateRoute from './utils/PrivateRoute';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ProductForm from './components/ProductForm';
import ProductDelete from './components/ProductDelete';

interface User {
	id?: number;
	name?: string;
	email_address?: string;
	phone_number?: string;
}

const App: React.FC = () => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [user, setUser] = useState<User>({});
	const [signupSuccess, setSignupSuccess] = useState<boolean>(false);

	const handleLogin = (data: { auth_token: string }) => {
		setIsLoggedIn(true);
		setUser(data.user);
		// Store the auth_token in local storage
		localStorage.setItem('auth_token', data.auth_token);
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
		setUser({});
		// Remove the auth_token from local storage
		localStorage.removeItem('auth_token');
	};

	return (
		<div>
			<BrowserRouter>
				<Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
				<Routes>
					<Route path='/home' element={<PrivateRoute />}>
						<Route path='/home' element={<Main user={user} />} />
					</Route>
					<Route
						path='/login'
						element={<Login handleLogin={handleLogin} />}
					/>
					<Route
						path='/signup'
						element={<Signup setSignupSuccess={setSignupSuccess} />}
					/>
					<Route path='/products' element={<PrivateRoute />}>
						<Route path='' element={<ProductList />} />
						<Route path=':id' element={<ProductDetail />} />
						<Route path='new' element={<ProductForm />} />
						<Route path=':id/edit' element={<ProductForm />} />
						<Route path=':id/delete' element={<ProductDelete />} />
					</Route>
					<Route
						path='*'
						element={<Home signupSuccess={signupSuccess} />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
