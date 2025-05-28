"use client";

import { useState } from 'react';

export default function UpdateDataExcel() {
  const [data, setData] = useState([]);

  const fixedKeys = [
    'sno',
    'employeeCode',
    'employeeName',
    'department',
    'designation',
    'location',
    'emailId',
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      const text = event.target.result;
      const lines = text.trim().split('\n');

      const cleanedData = lines.slice(1).map((line, rowIndex) => {
        const values = line.split(',').map(val => val.replace(/"/g, '').trim());
        const entry = {};

        fixedKeys.forEach((key, i) => {
          entry[key] = values[i] || '';
        });

        return entry;
      });

      localStorage.setItem('All_EMPLOYEE_LIST', JSON.stringify(cleanedData));
      setData(cleanedData);
    };

    reader.readAsText(file);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Upload CSV File</h1>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mb-4"
      />

      {data.length > 0 && (
        <div className="overflow-auto border rounded p-2">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
