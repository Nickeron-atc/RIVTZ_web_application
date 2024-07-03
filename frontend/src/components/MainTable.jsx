import React, { useState } from 'react';
import TableHead from './TableHead';

import MyButton from './UI/Button/MyButton';

const MainTable = ({ columns, data }) => {
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
            <TableHead columns={columns} filters={filters} setFilter={setFilter} />
            <tbody>
                {filteredData.map(row => (
                    <tr key={row.id}>
                        {columns.map(column => (
                            <td key={column}>{row[column]}</td>
                        ))}
                        <td>
                            {/* Ваши действия, такие как редактирование и т.д. */}
                            <MyButton>Edit</MyButton>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MainTable;
