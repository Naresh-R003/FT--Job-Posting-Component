import React, { useState, useEffect } from 'react';

const JobInfo = ({ formData, onNext, onFormChange }) => {
  const [jobInfo, setJobInfo] = useState(formData);

  useEffect(() => {
    setJobInfo(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedJobInfo = { ...jobInfo, [name]: value };
    setJobInfo(updatedJobInfo);
    onFormChange(updatedJobInfo);
  };

  const handleSubmit = () => {
    onNext(jobInfo);
  };

  return (
    <div>
      <h2>Job Info</h2>
      <div className='input-flex'>
        <div className="input-group">
          <input className='inputs in' type="text" name="firstName1" value={jobInfo.firstName1} onChange={handleChange} required />
          <label>Project Name*</label>
        </div>
        <div className="input-group">
          <input className='inputs in' type="text" name="firstName2" value={jobInfo.firstName2} onChange={handleChange} required />
          <label>Job Name*</label>
        </div>
      </div>
      <div className='input-flex'>
        <div className="input-group input2">
          <input className='in' type="text" name="firstName3" value={jobInfo.firstName3} onChange={handleChange} required />
          <label>Job Title*</label>
        </div>
      </div>
      <div className='input-flex'>
        <div className="input-group">
          <input className='inputs in' type="time" name="firstName4" value={jobInfo.firstName4} onChange={handleChange} required />
          <label>Bussiness Hours From*</label>
        </div>
        <div className="input-group">
          <input className='inputs in' type="time" name="firstName5" value={jobInfo.firstName5} onChange={handleChange} required />
          <label>Bussiness Hours To*</label>
        </div>
      </div>
      <div className='input-flex'>
        <div className="input-group">
          <input className='inputs in' type="date" name="firstName6" value={jobInfo.firstName6} onChange={handleChange} required />
          <label>Start Date & Time*</label>
        </div>
        <div className="input-group">
          <input className='inputs in' type="date" name="firstName7" value={jobInfo.firstName7} onChange={handleChange} required />
          <label>End Date & Time*</label>
        </div>
      </div>
      <div className='input-flex'>
        <div className="input-group">
          <input className='inputs in' type="text" name="firstName8" value={jobInfo.firstName8} onChange={handleChange} required />
          <label>Number of Additional Hours Permitted*</label>
        </div>
        <div className="input-group">
          <input className='inputs in' type="text" name="firstName9" value={jobInfo.firstName9} onChange={handleChange} required />
          <label>Estimated Hours*</label>
        </div>
      </div>
      <div className='input-flex'>
        <div className="input-group">
          <input className='inputs in' type="text" name="firstName0" value={jobInfo.firstName0} onChange={handleChange} required />
          <label>Number of Engineers Required*</label>
        </div>
        <div className="input-group">
          <input className='inputs in' type="text" name="firstName11" value={jobInfo.firstName11} onChange={handleChange} required />
          <label>Work Location*</label>
        </div>
      </div>
      <button className='buton' onClick={handleSubmit}>Next</button>
    </div>
  );
};

export default JobInfo;
