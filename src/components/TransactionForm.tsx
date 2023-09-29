import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

// Components
import Table from './Table';
import Error from './Error';

interface TransactionFormProps {
	flexDirection?: 'column';
}


const TransactionForm: React.FC<TransactionFormProps> = ({ flexDirection }) => {
	const { id } = useParams();
	const [transaction, setTransaction] = useState({
        quantity: '',
        total_cost: '',
        product_id: '',
        credit_card_id: '',
    });

    const [productIdList, setProductIdList] = useState([]);
    const [creditCardIdList, setCreditCardIdList] = useState([]);
    const [showError, setShowError] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		async function fetchTransactionData() {
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
		if (id) {
			fetchTransactionData();
		}
	}, [id]);

    useEffect(() => {
        const fetchLists = async () => {
            const response = await axios.get(
				`http://localhost:3000/credit_cards`,
				{
					headers: {
						Authorization: localStorage.getItem('auth_token'),
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				}
			);
            const list: string[] = []
            response.data.map(elem => {
                list.push([elem.id, elem.name])
            })
			setCreditCardIdList(list);


            const response_ = await axios.get(
				`http://localhost:3000/products`,
				{
					headers: {
						Authorization: localStorage.getItem('auth_token'),
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				}
			);
            const list_: string[] = []
            response_.data.map(elem => {
                list_.push([elem.id, elem.name])
            })
			setProductIdList(list_);
        };
        fetchLists();
    }, []);

    useEffect(() => {
        console.log(creditCardIdList)
    }, [creditCardIdList]);

    useEffect(() => {
        console.log(productIdList)
    }, [productIdList]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setTransaction({ ...transaction, [name]: value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

        const p_ids: string[] = []
        const cc_ids: string[] = []

        productIdList.map(elem => p_ids.push(elem[0]))
        creditCardIdList.map(elem => cc_ids.push(elem[0]))

        if(!p_ids.includes(transaction.product_id) || !cc_ids.includes(transaction.credit_card_id)){
            setShowError(true);
        }
        
        if (id) {
			// Update existing credit card
			await axios.put(`http://localhost:3000/transactions/${id}`, transaction, {
				headers: {
					Authorization: localStorage.getItem('auth_token'),
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
			// Redirect to credit card list page or do something else after submission
			navigate('/transactions');
			
		} else {
			// Create a new credit card
			await axios.post('http://localhost:3000/transactions', transaction, {
				headers: {
					Authorization: localStorage.getItem('auth_token'),
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});

			// Redirect to credit card list page or do something else after submission
			navigate('/transactions');
		}
	};

	const formStyle = {
		fontFamily: 'Arial, sans-serif',
		// backgroundColor: '#f0f0f0',
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
		// color: 'white',
		padding: '10px 20px',
		border: 'none',
		borderRadius: '4px',
		cursor: 'pointer',
	};

    const tableContainerStyle = {
		flexDirection: flexDirection || 'column'
	};

	return (
		<div style={formStyle}>
            {showError && <Error message='Product ID or Credit Card ID invalid'/>}
			<h1 style={headerStyle}>
				{id ? 'Edit Transactions' : 'Create Transaction'}
			</h1>
			<form onSubmit={handleSubmit}>
				<label style={labelStyle}>
					Quantity:
					<input
						type='number'
						name='quantity'
						value={transaction.quantity}
						onChange={handleChange}
						style={inputStyle}
					/>
				</label>
				<label style={labelStyle}>
					Total Cost:
					<input
						type='number'
						name='total_cost'
						value={transaction.total_cost}
						onChange={handleChange}
						style={inputStyle}
					/>
				</label>
				<label style={labelStyle}>
                    Product ID:
					<input
                        type="text"
						name='product_id'
						value={transaction.product_id}
						onChange={handleChange}
						style={inputStyle}
					/>
				</label>
				<label style={labelStyle}>
                Credit Card ID:
					<input
						type='text'
						name='credit_card_id'
						value={transaction.credit_card_id}
						onChange={handleChange}
						style={inputStyle}
					/>
				</label>
				<button type='submit' style={buttonStyle}>
					{id ? 'Update' : 'Create'}
				</button>
			</form>

            <div style={tableContainerStyle}>
                <Table header="Products" rows={productIdList}/>
                <Table header="Credit Cards" rows={creditCardIdList} />
            </div>
		</div>
	);
};

export default TransactionForm;