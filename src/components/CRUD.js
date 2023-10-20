import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const CRUDComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({id:'',name: '', job_title: '', department: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');


  console.log('Fetching data...'); // Log to check if this block is executed

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/employees');
      console.log('API Response:', response.data); // Log the API response data
      setEmployees(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
  fetchData();
}, []);

  // Empty dependency array ensures useEffect runs only once (on component mount)

  const handleCreate = async () => {
    try {
      await axios.post('http://localhost:5000/employees', formData);
      fetchData(); // Call fetchData function to refresh the employee list after creation
      setFormData({ name: '', job_title: '', department: '' });
      setMessage('Created Successfuly');
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      
      await axios.put(`http://localhost:5000/employees?id=${id}`, formData);
      fetchData();
      setFormData({ name: '', job_title: '', department: '' });
      setMessage('Updated Successfuly');
      console.log('success');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/employees?id=${id}`);
      fetchData(); // Call fetchData function to refresh the employee list after deletion
      setMessage('Deleted Successfuly');
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };
 
  return (
    <div className="container">
      <h2>Employee Management</h2>
      {message && <div className="alert">{message}</div>}
      <div className="input-group">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Job Title"
          value={formData.job_title}
          onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Department"
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
        />
        <button className="create-button" onClick={handleCreate}>Create</button>

      </div>
      {loading && <p>Loading...</p>}
      {!loading && employees.length > 0 && (
        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Job Title</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

            {employees.map((employee, index) => {
              return (
                <tr key={employee[0]}>
                  <td>{employee[1]}</td>
                  <td>{employee[2]}</td>
                  <td>{employee[3]}</td>
                  <td>
                    <button className="update-button" onClick={() => handleUpdate(employee)}>Update</button>
                    <button className="delete-button" onClick={() => handleDelete(employee[0])}>Delete</button>
                  </td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
      )}
      {!loading && employees.length === 0 && <p>No employees found.</p>}
    </div>
  );
};

export default CRUDComponent;
