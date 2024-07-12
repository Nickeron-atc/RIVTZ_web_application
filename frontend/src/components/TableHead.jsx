import React, {useState} from 'react';
import MyInput from './UI/input/MyInput';

// Компонент для фильтра
const ColumnFilter = ({ column, filterValue, setFilter, labels, filter_type }) => {
    return (
        <MyInput
            value={filterValue || ''}
            onChange={(e) => setFilter(column, e.target.value)}
            placeholder={`Filter ${labels[column]}`}
        />
    );
};

const TableHead = ({ columns, labels, filters, setFilter, filter_types }) => {
    return (
        <thead>
            <tr>
                {columns.map(column => (
                    <th key={column}>
                        {labels[column]}
                        <ColumnFilter
                            column={column}
                            filterValue={filters[column]}
                            setFilter={setFilter}
                            labels={labels}
                        />
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHead;
