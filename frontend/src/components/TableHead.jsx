import React, {useState} from 'react';
import MyInput from './UI/input/MyInput';

// Компонент для фильтра
const ColumnFilter = ({ column, filterValue, setFilter, filter_type }) => {
    console.log(column)
    return (
        <MyInput
            value={filterValue || ''}
            onChange={(e) => setFilter(column, e.target.value)}
            placeholder={`Filter ${column}`}
        />
    );
};

const TableHead = ({ columns, filters, setFilter, filter_types }) => {
    return (
        <thead>
            <tr>
                {columns.map(column => (
                    <th key={column}>
                        {column}
                        <ColumnFilter
                            column={column}
                            filterValue={filters[column]}
                            setFilter={setFilter}
                        />
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHead;
