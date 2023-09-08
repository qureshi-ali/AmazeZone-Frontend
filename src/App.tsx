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

	useEffect(() => {
		loginStatus();
	}, []);

	const loginStatus = () => {
		axios
			.get('http://localhost:3001/logged_in', { withCredentials: true })
			.then((response) => {
				if (response.data.logged_in) {
					handleLogin(response.data);
				} else {
					handleLogout();
				}
			})
			.catch((error) => console.log('api errors:', error));
	};

	const handleLogin = (data: { user: User }) => {
		setIsLoggedIn(true);
		setUser(data.user);
		console.log(isLoggedIn);
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
		setUser({});
		console.log(isLoggedIn);
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
								element={<Signup handleLogin={handleLogin} />}
							/>
							<Route path='*' element={<Home />} />
						</>
					)}
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
