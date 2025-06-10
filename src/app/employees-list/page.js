"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from 'react-data-grid';
import Header from '@/main-component/main-header';
import CustomButton from '@/core-component/custom_button';
import CustomModal from '@/core-component/custom_modal';
import 'react-data-grid/lib/styles.css';
import './style.css';
 import {getAllEmployee} from "../../../lib/api/userApi"
import { addAllEmployee } from "../../../lib/api/userApi";
import { updateEmployee } from "../../../lib/api/userApi";

export default function EmployeesTable() {
  console.log("getAllEmployee",getAllEmployee())
  const [isOpen, setIsOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState(() => new Set());
  const [sortColumns, setSortColumns] = useState([]);
  const [filters, setFilters] = useState({});
  const [editingEmployee, setEditingEmployee] = useState(null);


  const [formData, setFormData] = useState({
    // sno: '',
    employeeCode: '',
    employeeName: '',
    department: '',
    designation: '',
    location: '',
    emailId: ''
  });

      const [emplyeeList, setEmloyeeList] = useState([]);
      const [error, setError] = useState('');

      console.log("formData",formData);
      
    
        useEffect(() => {
        const fetchUsers = async () => {
          const result = await getAllEmployee();
    
          if (result.success) {
            setEmloyeeList(result.data);
               setRows(result.data);
          } else {
            setError(result.error);
          }
        };
    
        fetchUsers();
      }, []);


     

 useEffect(() => {
//   const storedString = localStorage.getItem('All_EMPLOYEE_LIST');
//   const storedData = storedString ? JSON.parse(storedString) : [];
//  setRows(emplyeeList);
//   console.log("storedData", storedData);

//   if (Array.isArray(storedData)) {
//     const dataWithIds = storedData.map((item, index) => ({ ...item, id: index }));
   
//   }
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
    return false;
  }

  const exportToCSV = () => {
    const headers = columns
      .filter(col => col.key !== 'select')
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
    link.setAttribute('download', 'employees.csv');
    link.click();
  };

 
//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   const payload = {
//     employeeCode: formData.employeeCode,
//     employeeName: formData.employeeName,
//     department: formData.department,
//     designation: formData.designation,
//     location: formData.location,
//     email: formData.emailId
//   };

//   const result = await addAllEmployee(payload);

//   if (result.success) {
//     const newEmployee = {
//       ...result.data,
//       id: rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 0
//     };

//     setRows(prev => [...prev, newEmployee]);
//     setFormData({
//       sno: '',
//       employeeCode: '',
//       employeeName: '',
//       department: '',
//       designation: '',
//       location: '',
//       emailId: ''
//     });
//     setIsOpen(false);
//   } else {
//     alert(result.error); // Show error if employeeCode already exists
//   }
// };

const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    employeeName: formData.employeeName,
    department: formData.department,
    designation: formData.designation,
    location: formData.location,
    email: formData.emailId
  };

  let result;
  if (editingEmployee) {
    
    result = await updateEmployee(formData.employeeCode, payload);
    console.log('Updating employee with code:', formData.employeeCode);
  } else {
    result = await addAllEmployee({ ...payload, employeeCode: formData.employeeCode });
  }

  if (result.success) {
    const fetchResult = await getAllEmployee();
    if (fetchResult.success) {
      
      setRows(fetchResult.data.map((item, index) => ({ ...item, id: index })));
    }
    setFormData({
      sno: '',
      employeeCode: '',
      employeeName: '',
      department: '',
      designation: '',
      location: '',
      emailId: ''
    });
    setEditingEmployee(null);
    setIsOpen(false);
  } else {
    alert(result.error);
  }
};

console.log("isOpen",isOpen);


  function inventoryFormEmployee() {
    return (
      <div className="p-6">
        <CustomModal   isOpen={isOpen}
  onClose={() => {
    setIsOpen(false);
    setEditingEmployee(null); // reset editing state
  }}
  title={editingEmployee ? 'Edxxit Employee' : 'Add Employevfe'}>
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              minWidth: '900px'
            }}
          >
            {Object.keys(formData).map((key) => (
              <div key={key}>
                <label style={{ display: 'block', fontWeight: 'bold', color: '#000' }}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </label>
                <input
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #000', color: '#FF8C00' }}
                />
              </div>
            ))}
            <button type="submit" style={{ marginTop: '20px', padding: '0.4rem', fontWeight: 'bold', background: 'hsl(28, 100%, 47%)' }}> {editingEmployee ? 'Update Employee' : 'Add Employee'}</button>
          </form>
        </CustomModal>
      </div>
    );
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
      cellClass: 'text-center'
    },
  {
  key: 'sno',
  name: 'S.No',
  width: 60,
  frozen: true,
  renderCell: ({ row, rowIdx }) => rowIdx + 1
},
    { key: 'employeeCode', name: 'Employee Code' },
    { key: 'employeeName', name: 'Employee Name' },
    { key: 'department', name: 'Department' },
    { key: 'designation', name: 'Designation' },
    { key: 'location', name: 'Location' },
    { key: 'email', name: 'Email ID' }
  ];

  return (
    <div>
      <Header />
      <div style={{ background: '#000' }}>
        <CustomButton style={{ background: '#FFA500', marginBottom: '20px', marginLeft: '20px' }}   onClick={() => {
   setFormData({
      sno: '',
      employeeCode: '',
      employeeName: '',
      department: '',
      designation: '',
      location: '',
      emailId: ''
    });
     setEditingEmployee(null);
    setIsOpen(true);
  }}>
          Add New new
        </CustomButton>
        <CustomButton
          style={{ background: '#4CAF50', marginBottom: '20px', marginLeft: '10px' }}
          onClick={exportToCSV}
        >
          Export to CSV
        </CustomButton>
        {/* <DataGrid
          rowKeyGetter={rowKeyGetter}
          columns={columns.map(col => ({
            ...col,
            sortable: col.key !== 'select'
          }))}
          rows={filteredRows}
          sortColumns={sortColumns}
          onSortColumnsChange={setSortColumns}
          selectedRows={selectedRows}
          onSelectedRowsChange={setSelectedRows}
          isRowSelectionDisabled={isRowSelectionDisabled}
           defaultColumnOptions={{
        minWidth: 100,
        resizable: true,
        sortable: true,
        draggable: true,
        height:500
      }}
        /> */}
        <DataGrid
  rowKeyGetter={rowKeyGetter}
  columns={columns.map(col => ({
    ...col,
    sortable: col.key !== 'select'
  }))}
  rows={filteredRows.slice(1)}
  sortColumns={sortColumns}
  onSortColumnsChange={setSortColumns}
  selectedRows={selectedRows}
  onSelectedRowsChange={setSelectedRows}
  isRowSelectionDisabled={isRowSelectionDisabled}
  defaultColumnOptions={{
    minWidth: 100,
    resizable: true,
    sortable: true,
    draggable: true,
    height: 500
  }}
  onCellClick={({row}) => {
    console.log("formData code",row)
    setFormData({
      // sno: '',
      employeeCode: row.employeeCode,
      employeeName: row.employeeName,
      department: row.department,
      designation: row.designation,
      location: row.location,
      emailId: row.email
    });
    setEditingEmployee(row); // store the employee being edited
    setIsOpen(true);
  }}
/>

      </div>
      {inventoryFormEmployee()}
    </div>
  );
}
