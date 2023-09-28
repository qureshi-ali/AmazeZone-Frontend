import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface CreditCard {
	id: number;
	name: string;
	card_number: string;
	expiration_date: string;
	cvv: string;
}

const CreditCardDetail: React.FC = () => {
	const { id } = useParams();
	const [creditCard, setCreditCard] = useState<CreditCard | null>(null);

	useEffect(() => {
		async function fetchData() {
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

		fetchData();
	}, [id]);

	const containerStyle = {
		fontFamily: 'Arial, sans-serif',
		// backgroundColor: '#f0f0f0',
		padding: '20px',
		height: '100vh',
		width: '100vw',
	};

	const headerStyle = {
		fontSize: '24px',
		marginBottom: '20px',
	};

	const productInfoStyle = {
		border: '1px solid #ddd',
		borderRadius: '4px',
		padding: '20px',
		// backgroundColor: 'white',
	};

	if (!creditCard) {
		return (
			<div style={containerStyle}>
				<h1 style={headerStyle}>Credit Card Detail</h1>
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<div style={containerStyle}>
			<h1 style={headerStyle}>Credit Card Detail</h1>
			<div style={productInfoStyle}>
				<p>
					<strong>Name:</strong> {creditCard.name}
				</p>
				<p>
					<strong>Card Number:</strong> {creditCard.card_number}
				</p>
				<p>
					<strong>Expiration Date:</strong> {creditCard.expiration_date}
				</p>
				<p>
					<strong>CVV:</strong> {creditCard.cvv}
				</p>
			</div>
			<div style={{ marginTop: '20px' }}>
				<Link to={`/credit_cards/${id}/edit`}>Edit</Link>
				<Link
					to={`/credit_cards/${id}/delete`}
					style={{ marginLeft: '10px' }}
				>
					Delete
				</Link>
			</div>
		</div>
	);
};

export default CreditCardDetail;
