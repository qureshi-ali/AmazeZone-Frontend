import React from 'react';

interface ErrorProps {
	message: string;
}

const Navbar: React.FC<ErrorProps> = ({ message }) => {
	const errorContainerStyle: React.CSSProperties = {
		backgroundColor: '#d9534f',
		padding: '10px',
		borderRadius: 12,
		width: '40%',
        textAlign: 'center',
        margin: 12,
        border: '2px solid white',
	};

	const errorTextStyle: React.CSSProperties = {
		color: 'white',
		alignItems: 'center',
	};


	return (
        <div style={errorContainerStyle}>
            <div style={errorTextStyle}>Error: {message}</div>
        </div>
		);
};

export default Navbar;
