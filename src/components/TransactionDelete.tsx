import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TransactionDelete: React.FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const buttonStyle = {
		backgroundColor: 'red',
		color: 'white',
		padding: '10px 20px',
		border: 'none',
		borderRadius: '4px',
		cursor: 'pointer',
	};

	const containerStyle = {
		fontFamily: 'Arial, sans-serif',
		padding: '20px',
		marginTop: '3%',
		width: '100vw',
		height: '100vh',
	};

	const confirmationStyle = {
		fontSize: '16px',
		marginBottom: '20px',
	};

	const handleDelete = async () => {
		if (window.confirm('Are you sure you want to delete this transaction?')) {
			await axios.delete(`http://localhost:3000/transactions/${id}`, {
				headers: {
					Authorization: localStorage.getItem('auth_token'),
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
			navigate('/transactions');
		}
	};

	return (
		<div style={containerStyle}>
			<h1>Delete Transaction</h1>
			<p style={confirmationStyle}>
				Are you sure you want to delete this transaction?
			</p>
			<button onClick={handleDelete} style={buttonStyle}>
				Delete Transaction
			</button>
		</div>
	);
};

export default TransactionDelete;