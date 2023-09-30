import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface TransactionProps {
	flexDirection?: 'column';
	textAlign?: 'center';
}

const TransactionList: React.FC<TransactionProps> = ({ flexDirection, textAlign }) => {
	const [transactions, setTransactions] = useState([
		{
			id: 0,
			quantity: '',
			total_cost: '',
			product_id: '',
			credit_card_id: '',
		}
	]);

	useEffect(() => {
		async function fetchData() {
			const response = await axios.get('http://localhost:3000/transactions', {
				headers: {
					Authorization: localStorage.getItem('auth_token'),
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			}); // Adjust the API endpoint as needed
			setTransactions(response.data);
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

	const listTitleStyle = {
		width: '15%',
	};

	return (
		<div style={pageStyle}>
			<h1 style={headerStyle}>Transaction List</h1>
			<ul>
				{transactions.map((transaction) => (
					<li key={transaction.id} style={listItemStyle}>
						<div style={listTitleStyle}>
							Quantity: {transaction.quantity}
						</div>
						<div style={listTitleStyle}>
							Total Cost: {transaction.total_cost}
						</div>
            <div style={listTitleStyle}>
							<b>Product ID:</b> {transaction.product_id}
						</div>
						<div style={listTitleStyle}>
							<b>Credit Card ID:</b> {transaction.credit_card_id}
						</div>
						<Link to={`/transactions/${transaction.id}`} style={linkStyle}>
							Show
						</Link>
						<Link
							to={`/transactions/${transaction.id}/delete`}
							style={linkStyle}
						>
							Delete
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TransactionList;
