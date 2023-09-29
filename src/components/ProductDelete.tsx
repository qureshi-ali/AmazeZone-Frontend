import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDelete: React.FC = () => {
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
		// backgroundColor: '#f0f0f0',
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
		if (window.confirm('Are you sure you want to delete this product?')) {
			await axios.delete(`http://localhost:3000/products/${id}`, {
				headers: {
					Authorization: localStorage.getItem('auth_token'),
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
			navigate('/products');
		}
	};

	return (
		<div style={containerStyle}>
			<h1>Delete Product</h1>
			<p style={confirmationStyle}>
				Are you sure you want to delete this product?
			</p>
			<button onClick={handleDelete} style={buttonStyle}>
				Delete Product
			</button>
		</div>
	);
};

export default ProductDelete;
