import React from 'react';

const Table = ({ columns, data = [], onEdit, onDelete }) => {
  if (!Array.isArray(data)) {
    console.error("The 'data' prop passed to Table is not an array:", data);
    return <p className="text-red-500">Error: Los datos no son válidos.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-700 rounded-lg shadow-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="border border-gray-700 px-4 py-2 text-left font-semibold"
              >
                {col.label}
              </th>
            ))}
            <th className="border border-gray-700 px-4 py-2 text-left font-semibold">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className={`${
                index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'
              } hover:bg-gray-700 transition-colors`}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="border border-gray-700 px-4 py-2 text-gray-300"
                >
                  {col.render ? col.render(item[col.key], item) : item[col.key]}
                </td>
              ))}
                {/* Actions column */}
              <td className="border border-gray-700 px-4 py-2">
                <button
                  onClick={() => onEdit(item)}
                  className="text-blue-400 hover:text-blue-300 font-medium mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-400 hover:text-red-300 font-medium"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;