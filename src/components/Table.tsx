import React from 'react';

interface TableProps {
    header: string;
	rows: list;
}

const Table: React.FC<TableProps> = ({ header, rows }) => {
	// const errorContainerStyle: React.CSSProperties = {
	// 	backgroundColor: '#d9534f',
	// 	padding: '10px',
	// 	borderRadius: 12,
	// 	width: '40%',
    //     textAlign: 'center',
    //     margin: 12,
    //     border: '2px solid white',
	// };

	// const errorTextStyle: React.CSSProperties = {
	// 	color: 'white',
	// 	alignItems: 'center',
	// };

    const TableStyle: React.CSSProperties = {
		margin: 24,
        border: '2px solid white',
        padding: 16,
        textAlign: 'left',
	};

    const CellStyle: React.CSSProperties = {
        paddingLeft: 14,
	};

	return (
        <div style={TableStyle}>
            <h3>{header}</h3>
            <table>
                <tr>
                    <th>ID</th>
                    <th style={CellStyle}>Name</th>
                </tr>
                {rows.map(elem => {
                    return (
                        <tr>
                            <td>{elem[0]}</td>
                            <td style={CellStyle}>{elem[1]}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
		);
};

export default Table;
