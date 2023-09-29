import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface CreditCardProps {
	flexDirection?: 'column';
	textAlign?: 'center';
}

const CreditCardList: React.FC<CreditCardProps> = ({ flexDirection, textAlign }) => {
	const [creditCards, setCreditCards] = useState([
		{
			id: 0,
			name: '',
			card_number: '',
			expiration_date: '',
			cvv: '',
		}
	]);

	useEffect(() => {
		async function fetchData() {
			const response = await axios.get('http://localhost:3000/credit_cards', {
				headers: {
					Authorization: localStorage.getItem('auth_token'),
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			}); // Adjust the API endpoint as needed
			setCreditCards(response.data);
		}

		fetchData();
	}, []);

	const pageStyle = {
		width: '90vw',
		height: '100vh',
		display: 'flex',
		flexDirection: flexDirection || 'column',
		marginLeft: '16px',
	};

	const headerStyle = {
		marginTop: '5%',
		fontSize: '2.5rem',
		marginBottom: '20px',
	};

	const listItemStyle = {
		marginBottom: '10px',
		padding: '10px',
		// backgroundColor: 'white',
		border: '1px solid #ddd',
		borderRadius: '4px',
		display: 'flex',
		justifyContent: 'start',
		alignItems: 'center',
	};

	const linkStyle = {
		width: '10%',
		textAlign: textAlign || 'center',
		textDecoration: 'none',
		marginLeft: 'auto',
		padding: '5px 10px',
		backgroundColor: '#007bff',
		color: 'white',
		borderRadius: '4px',
	};
	const linkStyle2 = {
		width: '15%',
		textAlign: textAlign || 'center',
		textDecoration: 'none',
		marginTop: '5%',
		padding: '5px 10px',
		backgroundColor: '#007bff',
		color: 'white',
		borderRadius: '4px',
	};
	const listTitleStyle = {
		width: '30%',
	};

	return (
		<div style={pageStyle}>
			<h1 style={headerStyle}>Credit Card List</h1>
			<ul>
				{creditCards.map((creditCard) => (
					<li key={creditCard.id} style={listItemStyle}>
						<div style={listTitleStyle}>
							{creditCard.name} - {creditCard.card_number}
						</div>
            <div style={listTitleStyle}>
							<b>CVV:</b> {creditCard.cvv} <b>EXP:</b> {creditCard.expiration_date}
						</div>
						<Link to={`/credit_cards/${creditCard.id}`} style={linkStyle}>
							Show
						</Link>
						<Link
							to={`/credit_cards/${creditCard.id}/edit`}
							style={linkStyle}
						>
							Edit
						</Link>
						<Link
							to={`/credit_cards/${creditCard.id}/delete`}
							style={linkStyle}
						>
							Delete
						</Link>
					</li>
				))}
			</ul>
			<Link to={`/credit_cards/new`} style={linkStyle2}>
				New Credit Card
			</Link>
		</div>
	);
};

export default CreditCardList;
