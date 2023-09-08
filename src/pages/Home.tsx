import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
	const containerStyle: React.CSSProperties = {
		width: '100vw',
		height: '100vh',
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
	};

	const headingStyle: React.CSSProperties = {
		fontSize: '36px',
		marginBottom: '20px',
		color: '#333',
	};

	const paragraphStyle: React.CSSProperties = {
		fontSize: '18px',
		marginBottom: '20px',
		color: '#666',
	};

	const buttonContainerStyle: React.CSSProperties = {
		display: 'flex',
		justifyContent: 'center',
	};

	const buttonStyle: React.CSSProperties = {
		display: 'inline-block',
		padding: '10px 20px',
		margin: '0 10px',
		textAlign: 'center',
		textDecoration: 'none',
		fontSize: '16px',
		borderRadius: '5px',
		transition: 'background-color 0.3s ease',
	};

	const loginButtonStyle: React.CSSProperties = {
		backgroundColor: '#007bff',
		color: '#fff',
	};

	const signupButtonStyle: React.CSSProperties = {
		backgroundColor: '#28a745',
		color: '#fff',
	};

	return (
		<div style={containerStyle}>
			<h1 style={headingStyle}>Welcome to AmazeZone</h1>
			<p style={paragraphStyle}>
				Get started by logging in or signing up:
			</p>
			<div style={buttonContainerStyle}>
				<Link
					to='/login'
					style={{ ...buttonStyle, ...loginButtonStyle }}
				>
					Log In
				</Link>
				<Link
					to='/signup'
					style={{ ...buttonStyle, ...signupButtonStyle }}
				>
					Sign Up
				</Link>
			</div>
		</div>
	);
};

export default Home;
