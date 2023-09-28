import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/Main';
import Navbar from './components/Navbar';

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

	useEffect(() => {
		// Function to make the API call and check the auth token validity
		const checkAuthTokenValidity = async () => {
			try {

				const authToken = localStorage.getItem('auth_token');

				const headers: HeadersInit = authToken
					? { Authorization: `Bearer ${authToken}` }
					: {};

				const response = await axios('http://localhost:3000/auth/current', {
					headers,
				});

				if (response.status === 200) {
					setIsLoggedIn(true);
					setUser(response.data)
				} else {
					setIsLoggedIn(false);
					setUser({});
				}
			} catch (error) {
				console.error('Error checking auth token validity:', error);
				setIsLoggedIn(false);
			}
		};

		// Call the function to check auth token validity when the component mounts
		checkAuthTokenValidity();
	}, []);

	const handleLogin = (data: { user: User; auth_token: string }) => {
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
					{isLoggedIn ? (
						<>
							<Route
								path='/home'
								element={<Main user={user} />}
							/>
							<Route path='*' element={<Main user={user} />} />
						</>
					) : (
						<>
							<Route
								path='/login'
								element={<Login handleLogin={handleLogin} />}
							/>
							<Route
								path='/signup'
								element={
									<Signup
										setSignupSuccess={setSignupSuccess}
									/>
								}
							/>
							<Route
								path='*'
								element={<Home signupSuccess={signupSuccess} />}
							/>
						</>
					)}
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
