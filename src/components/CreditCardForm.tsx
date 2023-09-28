import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CreditCardForm: React.FC = () => {
	const { id } = useParams();
	const [creditCard, setCreditCard] = useState({
		name: '',
		card_number: '',
		expiration_date: '',
		cvv: '',
	});

	const navigate = useNavigate();

	useEffect(() => {
		async function fetchCreditCardData() {
			const response = await axios.get(
				`http://localhost:3000/credit_cards/${id}`,
				{
					headers: {
						Authorization: localStorage.getItem('auth_token'),
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				}
			);
			setCreditCard(response.data);
		}
		if (id) {
			fetchCreditCardData();
		}
	}, [id]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCreditCard({ ...creditCard, [name]: value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (id) {
			// Update existing credit card
			await axios.put(`http://localhost:3000/credit_cards/${id}`, creditCard, {
				headers: {
					Authorization: localStorage.getItem('auth_token'),
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
		} else {
			// Create a new credit card
			await axios.post('http://localhost:3000/credit_cards', creditCard, {
				headers: {
					Authorization: localStorage.getItem('auth_token'),
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
		}
		// Redirect to credit card list page or do something else after submission
		navigate('/credit_cards');
	};

	const formStyle = {
		fontFamily: 'Arial, sans-serif',
		// backgroundColor: '#f0f0f0',
		padding: '20px',
		height: '100vh',
		width: '100vw',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	};

	const headerStyle = {
		fontSize: '24px',
		marginBottom: '20px',
	};

	const labelStyle = {
		display: 'block',
		marginBottom: '10px',
	};

	const inputStyle = {
		width: '100%',
		padding: '8px',
		marginBottom: '10px',
		border: '1px solid #ddd',
		borderRadius: '4px',
	};

	const buttonStyle = {
		backgroundColor: '#007bff',
		// color: 'white',
		padding: '10px 20px',
		border: 'none',
		borderRadius: '4px',
		cursor: 'pointer',
	};

	return (
		<div style={formStyle}>
			<h1 style={headerStyle}>
				{id ? 'Edit Credit Card' : 'Create Credit Card'}
			</h1>
      <p>Enter exp date in yyyy-MM-dd format. Not validated</p>
			<form onSubmit={handleSubmit}>
				<label style={labelStyle}>
					Name:
					<input
						type='text'
						name='name'
						value={creditCard.name}
						onChange={handleChange}
						style={inputStyle}
					/>
				</label>
				<label style={labelStyle}>
					Card Number:
					<input
						type='text'
						name='card_number'
						value={creditCard.card_number}
						onChange={handleChange}
						style={inputStyle}
					/>
				</label>
				<label style={labelStyle}>
					Expiration Date:
					<input
						type='text'
						name='expiration_date'
						value={creditCard.expiration_date}
						onChange={handleChange}
						style={inputStyle}
					/>
				</label>
				<label style={labelStyle}>
					CVV:
					<input
						type='text'
						name='cvv'
						value={creditCard.cvv}
						onChange={handleChange}
						style={inputStyle}
					/>
				</label>
				<button type='submit' style={buttonStyle}>
					{id ? 'Update' : 'Create'}
				</button>
			</form>
		</div>
	);
};

export default CreditCardForm;