import http from '../http';
console.log("http",http)

export const getAllEmployee = async () => {
  try {
    const res = await http.get('/api/employees');
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};


export const addAllEmployee = async (employeeData) => {
  try {
    const res = await http.post('/api/employees',employeeData);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};



export const updateEmployee = async (id, updatedData) => {
  try {
    const res = await http.put(`/api/employees/${id}`, updatedData);
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getAllocationInventory = async () => {
  try {
    const res = await http.get('/api/alloction_inventory');
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};

