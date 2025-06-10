'use client';

import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import Header from '@/main-component/main-header';
import CustomButton from '@/core-component/custom_button';
import  CustomModal  from '@/core-component/custom_modal';
import 'react-data-grid/lib/styles.css';

import "./style.css"

import { useState, useEffect } from 'react';
import { DataGrid, SelectColumn } from 'react-data-grid';
import { getAllocationInventory } from "../../../lib/api/userApi";



export default function AssetTable() {
      const [isOpen, setIsOpen] = React.useState(false);
      const [rows, setRows] = React.useState([]);
    const [selectedRows, setSelectedRows] = useState(() => new Set());
 const [error, setError] = useState('');
      const [sortColumns, setSortColumns] = useState([]);
const [filters, setFilters] = useState({});
   const [formData, setFormData] = React.useState({
    assetCode: '',
    assetType: '',
    assetModel: '',
    serialNumber: '',
    make: '',
    warrantyStartDate: '',
    warrantyExpireDate: '',
    os: '',
    processor: '',
    hardDisk: '',
    ram: '',
    invoiceNumber: '',
    invoiceDate: ''
  });

       useEffect(() => {
          const fetchUsers = async () => {
            const result = await getAllocationInventory();
      
            if (result.success) {
              // setEmloyeeList(result.data);
                 setRows(result.data);
            } else {
              setError(result.error);
            }
          };
      
          fetchUsers();
        }, []);

//   React.useEffect(() => {
//   const storedData = JSON.parse(localStorage.getItem('assets')) || [];
//   console.log("storedData",storedData);
  
//   setRows(storedData);
// }, []);

React.useEffect(() => {
  // const storedData = JSON.parse(localStorage.getItem('assets')) || [];
  // const dataWithIds = storedData.map((item, index) => ({ ...item, id: index }));
  // setRows(dataWithIds);
}, []);

const sortedRows = React.useMemo(() => {
  if (sortColumns.length === 0) return rows;

  return [...rows].sort((a, b) => {
    for (const sort of sortColumns) {
      const { columnKey, direction } = sort;
      const aVal = a[columnKey] ?? '';
      const bVal = b[columnKey] ?? '';

      const comparison = typeof aVal === 'string'
        ? aVal.localeCompare(bVal)
        : aVal > bVal ? 1 : aVal < bVal ? -1 : 0;

      if (comparison !== 0) {
        return direction === 'ASC' ? comparison : -comparison;
      }
    }
    return 0;
  });
}, [rows, sortColumns]);
const filteredRows = React.useMemo(() => {
  return sortedRows.filter(row =>
    Object.entries(filters).every(([key, value]) => {
      return row[key]?.toString().toLowerCase().includes(value.toLowerCase());
    })
  );
}, [sortedRows, filters]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

   function rowKeyGetter(row) {
    return row.id;
  }

  function isRowSelectionDisabled(row) {
    return !row.isActive;
  }

  const exportToCSV = () => {
  const headers = columns
    .filter(col => col.key !== 'select') // exclude checkbox column
    .map(col => col.name)
    .join(',');

  const csvRows = rows.map(row => {
    return columns
      .filter(col => col.key !== 'select')
      .map(col => `"${row[col.key] ?? ''}"`)
      .join(',');
  });

  const csvContent = [headers, ...csvRows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'assets.csv');
  link.click();
};



  const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};
const handleDelete = (indexToDelete) => {
  // const updatedAssets = rows.filter((_, index) => index !== indexToDelete);
  // setRows(updatedAssets);
  // localStorage.setItem('assets', JSON.stringify(updatedAssets));
};
const handleSubmit = (e) => {
  e.preventDefault();

  // Format date fields
  const formattedData = {
    ...formData,
    warrantyStartDate: formatDate(formData.warrantyStartDate),
    warrantyExpireDate: formatDate(formData.warrantyExpireDate),
    invoiceDate: formatDate(formData.invoiceDate),
  };




  // Reset form
  setFormData({
    assetCode: '',
    assetType: '',
    assetModel: '',
    serialNumber: '',
    make: '',
    warrantyStartDate: '',
    warrantyExpireDate: '',
    os: '',
    processor: '',
    hardDisk: '',
    ram: '',
    invoiceNumber: '',
    invoiceDate: ''
  });

  setIsOpen(false); // Close modal
};



    function inventoryFormEmployee(){
        return(
<div className="p-6">
    

      <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Inventory Management Form">
        <form onSubmit={handleSubmit} style={{ display: 'grid',gridTemplateColumns: '1fr 1fr', gap: '1rem', minWidth: '900px' }}>
      {Object.keys(formData).map((key) => (
        <div key={key}>
          <label style={{ display: 'block', fontWeight: 'bold' ,color:"#000"}}>   {key
    // insert spaces before each capital letter
    .replace(/([A-Z])/g, ' $1')
    // capitalize *only* the first character
    .replace(/^./, str => str.toUpperCase())
  }
</label>
          <input
            type={key.includes('Date') ? 'date' : 'text'}
            name={key}
            value={formData[key]}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem',border:"1px solid #000", color: '#FF8C00', }}
          />
        </div>
      ))}
      <button type="submit" style={{ marginTop:"25px",padding: '0.1rem', fontWeight: 'bold',background:"hsl(28, 100%, 47%)" }}>Add Asset</button>
    </form>
      </CustomModal>
    </div>
        )
    }

 const columns = [
  {
  key: 'select',
  name: (
    <input
      type="checkbox"
      checked={selectedRows.size === rows.length && rows.length > 0}
      onChange={(e) => {
        const newSelected = new Set();
        if (e.target.checked) {
          rows.forEach(row => newSelected.add(row.id));
        }
        setSelectedRows(newSelected);
      }}
    />
  ),
  width: 50,
  frozen: true,
  renderCell: ({ row }) => (
    <input
      type="checkbox"
      checked={selectedRows.has(row.id)}
      onChange={(e) => {
        const newSelected = new Set(selectedRows);
        if (e.target.checked) {
          newSelected.add(row.id);
        } else {
          newSelected.delete(row.id);
        }
        setSelectedRows(newSelected);
      }}
    />
  ),
  headerCellClass: 'text-center',
  cellClass: 'text-center',
}
,
  //  {
  //   key: 'select',
  //   name: '',
  //   width: 50,
  //   frozen: true,
  //   renderCell: ({ row, rowIdx }) => (
  //     <input
  //       type="checkbox"
  //       checked={selectedRows.has(row.id)}
  //       onChange={(e) => {
  //         const newSelected = new Set(selectedRows);
  //         if (e.target.checked) {
  //           newSelected.add(row.id);
  //         } else {
  //           newSelected.delete(row.id);
  //         }
  //         setSelectedRows(newSelected);
  //       }}
  //     />
  //   ),
  //   headerCellClass: 'text-center',
  //   cellClass: 'text-center'
  // },
  { key: 'assetCode', name: 'Asset Code' },
  { key: 'assetType', name: 'Asset Type' },
  { key: 'assetModel', name: 'Asset Model' },
  { key: 'serialNumber', name: 'Serial Number' },
  { key: 'make', name: 'Asset Company Name' },
  { key: 'warrantyStartDate', name: 'Warranty Start Date' },
  { key: 'warrantyExpireDate', name: 'Warranty Expire Date' },
  { key: 'os', name: 'OS' },
  { key: 'processor', name: 'Processor' },
  { key: 'hardDisk', name: 'Hard Disk' },
  { key: 'ram', name: 'RAM' },
  { key: 'invoiceNumber', name: 'Invoice Number' },
  { key: 'invoiceDate', name: 'Invoice Date' },

  //  {
  //   key: 'actions',
  //   name: 'Actions',
  //   renderCell: ({ rowIdx }) => (
  //     <button
  //       onClick={() => handleDelete(rowIdx)}
  //       style={{
  //         backgroundColor: '#ff4d4d',
  //         color: '#fff',
  //         border: 'none',
  //         padding: '4px 8px',
  //         borderRadius: '4px',
  //         cursor: 'pointer',
  //       }}
  //     >
  //       Delete
  //     </button>
  //   ),
  // },
];

console.log("rows",rows)

// const rows = [
//   {
//     assetCode: 'AC123',
//     assetType: 'Laptop',
//     assetModel: 'Dell XPS 13',
//     serialNumber: 'SN00123',
//     companyName: 'Dell',
//     warrantyStartDate: '2023-01-01',
//     warrantyExpireDate: '2026-01-01',
//     os: 'Windows 11',
//     processor: 'Intel i7',
//     hardDisk: '512GB SSD',
//     ram: '16GB',
//     invoiceNumber: 'INV001',
//     invoiceDate: '2023-01-05'
//   },
//   {
//     assetCode: 'AC124',
//     assetType: 'Desktop',
//     assetModel: 'HP EliteDesk',
//     serialNumber: 'SN00124',
//     companyName: 'HP',
//     warrantyStartDate: '2022-06-15',
//     warrantyExpireDate: '2025-06-15',
//     os: 'Windows 10',
//     processor: 'Intel i5',
//     hardDisk: '1TB HDD',
//     ram: '8GB',
//     invoiceNumber: 'INV002',
//     invoiceDate: '2022-06-20'
//   }
// ];

  return (

<div>
    <Header/>
<div style={{background:"#000"}}>
    <CustomButton style={{background: "#FFA500",marginBottom:"20px",marginLeft:'20px'}} onClick={() => setIsOpen(true)}
    >
        Add New
    </CustomButton>
    <CustomButton
  style={{ background: '#4CAF50', marginBottom: '20px', marginLeft: '10px' }}
  onClick={exportToCSV}
>
  Export to CSV s
</CustomButton>

  <DataGrid     rowKeyGetter={rowKeyGetter}
  columns={columns.map(col => ({
    ...col,
    sortable: col.key !== 'select' // allow sorting except on checkbox
  }))}
  rows={filteredRows}
  sortColumns={sortColumns}
  onSortColumnsChange={setSortColumns}
  selectedRows={selectedRows}
  onSelectedRowsChange={setSelectedRows}
  isRowSelectionDisabled={isRowSelectionDisabled}/>;
      
</div>
{inventoryFormEmployee()}
</div>
  );
}
