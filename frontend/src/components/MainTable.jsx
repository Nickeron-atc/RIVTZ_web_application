import React, { useState } from 'react';
import TableHead from './TableHead';

import MyButton from './UI/Button/MyButton';

const MainTable = ({ columns, labels, data, onClickButtonEdit, onClickButtonBlacklist }) => {
    const [filters, setFilters] = useState({});

    const setFilter = (column, value) => {
        setFilters({
            ...filters,
            [column]: value
        });
    };

    const filteredData = data.filter(row => {
        return columns.every(column => {
            return (
                row[column] && 
                row[column].toString().toLowerCase().includes((filters[column] || '').toLowerCase())
            );
        });
    });

    return (
    
        <table>
            <TableHead columns={columns} filters={filters} setFilter={setFilter} labels={labels} />
            <tbody>
                {filteredData.map(row => (
                    <tr key={row.id}>
                        {columns.map(column => (
                            <td key={column}>{row[column]}</td>
                        ))}
                        <td>
                            <MyButton onClick={() => onClickButtonEdit(row)}>Edit</MyButton>

                            <MyButton 
                                onClick={() => onClickButtonBlacklist(row)}
                                style={{'marginLeft':'5px', 'background':'rgba(200, 0, 0, 0.1)'}}
                            >Blacklist</MyButton>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MainTable;
