import React from 'react';

interface User {
	id?: number;
	name?: string;
	email_address?: string;
	phone_number?: string;
}

interface Props {
	user: User;
}

const Main: React.FC<Props> = ({ user = {} }) => {
	const containerStyle: React.CSSProperties = {
		textAlign: 'center',
		display: 'flex',
		flexDirection: 'column',
		paddingTop: '5%',
		alignItems: 'center',
		width: '100vw',
		height: '100vh',
	};

	const headingStyle: React.CSSProperties = {
		fontSize: '36px',
		marginBottom: '20px',
		color: '#333',
	};

	return (
		<div style={containerStyle}>
			<h1 style={headingStyle}>Welcome {user?.name}</h1>
		</div>
	);
};

export default Main;
