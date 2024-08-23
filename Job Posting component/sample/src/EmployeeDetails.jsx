import React, { useState } from 'react';

const EmployeeDetails = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    positionWanted: '',
    expectedJoiningDuration: '',
    salaryOffering: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to an API or display a messagevhsdvksgacfgsfcsjgv
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <h2>Employee Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Position Wanted:</label>
          <input
            type="text"
            name="positionWanted"
            value={formData.positionWanted}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          {/* <label>Expected Duration of Joining:</label> */}
          <input
            type="text"
            name="expectedJoiningDuration"
            value={formData.expectedJoiningDuration}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Salary Offering:</label>
          <input
            type="text"
            name="salaryOffering"
            value={formData.salaryOffering}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EmployeeDetails;
