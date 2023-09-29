import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface Transaction {
    id: 0,
    quantity: '',
    total_cost: '',
    product_id: '',
    credit_card_id: '',
}

const TransactionDetail: React.FC = () => {
	const { id } = useParams();
	const [transaction, setTransaction] = useState<Transaction | null>(null);

	useEffect(() => {
		async function fetchData() {
			const response = await axios.get(
				`http://localhost:3000/transactions/${id}`,
				{
					headers: {
						Authorization: localStorage.getItem('auth_token'),
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				}
			);
			setTransaction(response.data);
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

	if (!transaction) {
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
					<strong>Quantity:</strong> {transaction.quantity}
				</p>
				<p>
					<strong>Total Cost:</strong> {transaction.total_cost}
				</p>
				<p>
					<strong>Product ID:</strong> {transaction.product_id}
				</p>
				<p>
					<strong>Credit Card ID:</strong> {transaction.credit_card_id}
				</p>
			</div>
			<div style={{ marginTop: '20px' }}>
				<Link to={`/transactions/${id}/edit`}>Edit</Link>
				<Link
					to={`/transactions/${id}/delete`}
					style={{ marginLeft: '10px' }}
				>
					Delete
				</Link>
			</div>
		</div>
	);
};

export default TransactionDetail;
