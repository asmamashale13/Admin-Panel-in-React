
import React from 'react';

const EmployeeDetails = ({ employee }) => {
  return (
    <>
    <div>
      <h3>Employee Details</h3>
      <p>ID: {employee.emp_id}</p>
      <p>Name: {employee.emp_name}</p>
    </div>
    </>
  );
};

export default EmployeeDetails;
