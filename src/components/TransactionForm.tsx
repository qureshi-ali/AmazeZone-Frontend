import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

interface TransactionFormProps {
	flexDirection?: 'column';
}

interface CreditCard {
	id: number;
	name: string;
	card_number: string;
	expiration_date?: string;
	cvv?: string;
}

interface Product {
	id: number;
	name: string;
	category?: string;
	quantity?: number;
	price: number;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ flexDirection }) => {
	const location = useLocation();

	const { id } = useParams();
	const [transaction, setTransaction] = useState({
		quantity: 0,
		total_cost: 0,
		product_id: 0,
		credit_card_id: 0,
	});

	const [productMap, setProductMap] = useState<{ [key: number]: Product }>({});
	const [creditCardList, setCreditCardList] = useState<CreditCard[]>([]);

	const navigate = useNavigate();


	useEffect(() => {
		const fetchProductsAndCards = async () => {
			const creditCardListResponse = await axios.get(`http://localhost:3000/credit_cards`, {
				headers: {
					Authorization: localStorage.getItem('auth_token'),
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});

			const creditCards: CreditCard[] = creditCardListResponse.data;

			// This list of credit cards is used to populate the select options.
			setCreditCardList(creditCards);

			const productListResponse = await axios.get(`http://localhost:3000/products`, {
				headers: {
					Authorization: localStorage.getItem('auth_token'),
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});

			// Converting Products to a map for easy access to product price.
			const products: { [key: number]: Product } = {};
			productListResponse.data.map((product: Product) => {
				products[product.id] = { id: product.id, name: product.name, price: product.price };
			});

			// This map of products is used to populate the select options.
			setProductMap(products);

			// location.state.productId is present if any productId was transferred using the Link element (see how "Purchase" in Product List works)
			const productId = location.state && location.state.productId ? location.state.productId : Object.values(products)[0].id;

			setTransaction({ ...transaction, product_id: productId, credit_card_id: creditCards[0].id })
		};
		fetchProductsAndCards();
	}, []);

	useEffect(() => {
		// total cost is updated every time a product or quantity is changed
		const price = transaction.product_id ? transaction.product_id : 0;
		setTransaction({ ...transaction, total_cost: (transaction.quantity) * (price) });
	}, [transaction.product_id, transaction.quantity])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setTransaction({ ...transaction, [name]: value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		await axios.post('http://localhost:3000/transactions', transaction, {
			headers: {
				Authorization: localStorage.getItem('auth_token'),
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});

		navigate('/transactions');
	};

	const formStyle = {
		fontFamily: 'Arial, sans-serif',
		padding: '20px',
		height: '100vh',
		width: '100vw',
		display: 'flex',
		flexDirection: flexDirection || 'column',
		alignItems: 'center',
		justifyContent: 'center',
		overflowX: 'hidden',
		overflowY: 'auto',
		paddingTop: 250,
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
		padding: '10px 20px',
		border: 'none',
		borderRadius: '4px',
		cursor: 'pointer',
	};

	return (
		<div style={formStyle}>
			<h1 style={headerStyle}>
				Purchase
			</h1>
			<form onSubmit={handleSubmit}>
				<label style={labelStyle}>
					Quantity:
					<input
						type="number"
						name="quantity"
						value={transaction.quantity}
						onChange={handleChange}
						style={inputStyle}
					/>
				</label>
				<label style={labelStyle}>
					Product:
					<select style={inputStyle} name="product_id" value={transaction.product_id} onChange={handleChange} >
						{
							Object.values(productMap).map((product) => {
								return (
									<option value={product.id} key={product.id}>{product.name}</option>
								)
							})
						}
					</select>
				</label>
				<label style={labelStyle}>
					Total Cost:
					<input
						type="number"
						name="total_cost"
						value={transaction.total_cost}
						style={inputStyle}
						readOnly   // Field kept as readOnly
					/>
				</label>
				<label style={labelStyle}>
					Credit Card:
					<select style={inputStyle} name="credit_card_id" value={transaction.credit_card_id} onChange={handleChange} >
						{
							creditCardList.map((creditCard) => {
								return (
									<option value={creditCard.id} key={creditCard.id}>{creditCard.name} - {creditCard.card_number}</option>
								)
							})
						}
					</select>
				</label>
				<button type="submit" style={buttonStyle}>
					Complete Purchase
				</button>
			</form>

		</div>
	);
};

export default TransactionForm;
