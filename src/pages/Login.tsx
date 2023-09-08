import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface User {
	id: number;
	name: string;
	email_address: string;
	phone_number: string;
}

interface LoginState {
	username: string;
	email: string;
	password: string;
	errors: string[];
}

interface ApiResponse {
	logged_in: boolean;
	user: User;
	errors: string[];
	// Add other response properties here if needed
}

interface Props {
	handleLogin: (data: { user: User }) => void;
}

const Login: React.FC<Props> = ({ handleLogin }) => {
	const navigate = useNavigate();
	const [state, setState] = useState<LoginState>({
		username: '',
		email: '',
		password: '',
		errors: [],
	});

	const containerStyle: React.CSSProperties = {
		textAlign: 'center',
		width: '100vw',
		height: '100vh',
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	};

	const formStyle: React.CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	};

	const inputStyle: React.CSSProperties = {
		margin: '10px',
		padding: '8px',
		width: '300px',
		borderRadius: '4px',
		border: '1px solid #ccc',
	};

	const buttonStyle: React.CSSProperties = {
		margin: '10px',
		padding: '10px 20px',
		backgroundColor: '#007bff',
		color: '#fff',
		border: 'none',
		borderRadius: '4px',
		cursor: 'pointer',
	};

	const errorContainerStyle: React.CSSProperties = {
		color: 'red',
		marginTop: '10px',
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const { username, email, password } = state;
		const user = {
			name: username,
			email_address: email,
			password: password,
		};

		axios
			.post(
				'http://localhost:3001/login',
				{ user },
				{ withCredentials: true }
			)
			.then((response) => {
				const responseData: ApiResponse = response.data;
				if (responseData.logged_in) {
					handleLogin(responseData);
					redirect();
				} else {
					setState({
						...state,
						errors: responseData.errors,
					});
				}
			})
			.catch((error) => console.log('api errors:', error));
	};

	const redirect = () => {
		navigate('/home');
	};

	const handleErrors = () => {
		return (
			<div style={errorContainerStyle}>
				<ul>
					{state.errors.map((error, key) => {
						return <li key={key}>{error}</li>;
					})}
				</ul>
			</div>
		);
	};

	return (
		<div style={containerStyle}>
			<h1>Log In</h1>
			<form style={formStyle} onSubmit={handleSubmit}>
				<input
					placeholder='Username'
					type='text'
					name='username'
					value={state.username}
					onChange={handleChange}
					style={inputStyle}
				/>
				<input
					placeholder='Email'
					type='text'
					name='email'
					value={state.email}
					onChange={handleChange}
					style={inputStyle}
				/>
				<input
					placeholder='Password'
					type='password'
					name='password'
					value={state.password}
					onChange={handleChange}
					style={inputStyle}
				/>
				<button type='submit' style={buttonStyle}>
					Log In
				</button>
			</form>
			{handleErrors()}
		</div>
	);
};

export default Login;
