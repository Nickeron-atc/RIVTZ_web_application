import React, { useState } from 'react';
import TableHead from './TableHead';
import MyButton from './UI/Button/MyButton';

// Функция для преобразования данных
const transformData = (data) => {
  const transformed = [];
  data.forEach((item) => {
    item.versions.forEach((version, index) => {
      transformed.push({
        id: item.id,
        moduleName: item.moduleName,
        moduleName_text: index === 0 ? item.moduleName : '',
        version,
      });
      console.log('pushed: ' + version);
    });
  });
  return transformed;
};

const BlacklistTable = ({ columns, labels, data, onClickButtonDelete }) => {
  const [filters, setFilters] = useState({});

  const setFilter = (column, value) => {
    setFilters({
      ...filters,
      [column]: value,
    });
  };

  const transformedData = transformData(data);
  console.log('transformedData:', transformedData);

  const filteredData = transformedData.filter((row) => {
    return columns.every((column) => {
      console.log(`filtering ${column}: row[column]=${row[column]}, filter=${filters[column]}`);
      return (
        row[column] &&
        row[column].toString().toLowerCase().includes((filters[column] || '').toLowerCase())
      );
    });
  });

  console.log('filteredData:', filteredData);

  return (
    <table>
      <TableHead columns={columns} filters={filters} setFilter={setFilter} labels={labels} />
      <tbody>
        {filteredData.map((row, index) => (
          <tr key={`${row.moduleName}_${index}`}>
            <td>{row.moduleName_text}</td>
            <td>{row.version}</td>
            <td>
              <MyButton onClick={() => onClickButtonDelete({'moduleName':row.moduleName, 'version':row.version})}>Delete</MyButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BlacklistTable;
