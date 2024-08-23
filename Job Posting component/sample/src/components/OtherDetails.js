import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const OtherDetails = ({ formData, onNext, onPrevious, onFormChange, onSubmit }) => {
  const [otherDetails, setOtherDetails] = useState(formData);

  useEffect(() => {
    setOtherDetails(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedOtherDetails = { ...otherDetails, [name]: value };
    setOtherDetails(updatedOtherDetails);
    onFormChange(updatedOtherDetails);
  };

  const handleEditorChange = (value) => {
    const updatedOtherDetails = { ...otherDetails, additionalDetails: value };
    setOtherDetails(updatedOtherDetails);
    onFormChange(updatedOtherDetails);
  };

  const handleFinalSubmit = () => {
    const allFieldsFilled = Object.values(otherDetails).every(value => {
      if (typeof value === 'object' && value !== null) {
        return Object.values(value).every(subValue => subValue.trim() !== '');
      }
      return value && value.trim() !== '';
    });

    if (!allFieldsFilled) {
      alert('All details must be filled');
      return;
    }

    onNext(otherDetails);
    onSubmit();
  };

  return (
    <div className='other-details-container' style={{ width: "fit-content", marginRight: "-260px" }}>
      <h2>Other Details</h2><br></br>
      <div className='input-flex select-site'>
        <label className='site'>Select Site*</label>
        <div className="radio-group">
          <div>
            <label className={`custom-radio ${otherDetails.siteSelection === 'preSite' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="siteSelection"
                value="preSite"
                checked={otherDetails.siteSelection === 'preSite'}
                onChange={handleChange}
              />
              <span className="custom-radio-button"></span>
              Pre Site
            </label>
          </div>
          <div>
            <label className={`custom-radio ${otherDetails.siteSelection === 'postSite' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="siteSelection"
                value="postSite"
                checked={otherDetails.siteSelection === 'postSite'}
                onChange={handleChange}
              />
              <span className="custom-radio-button"></span>
              Post Site
            </label>
          </div>
          <div>
            <label className={`custom-radio ${otherDetails.siteSelection === 'onSite' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="siteSelection"
                value="onSite"
                checked={otherDetails.siteSelection === 'onSite'}
                onChange={handleChange}
              />
              <span className="custom-radio-button"></span>
              Onsite
            </label>
          </div>
        </div>
      </div>
      <div className='input-flex other'>
        <div className="input-group">
          <input className='inputs in' type="text" name="primaryLanguage" value={otherDetails.primaryLanguage} onChange={handleChange} required />
          <label>Primary Language*</label>
        </div>
        <div className="input-group">
          <input className='inputs in' type="text" name="secondaryLanguage" value={otherDetails.secondaryLanguage} onChange={handleChange} required />
          <label>Secondary Language*</label>
        </div>
      </div>
      <br></br>
      <div className='additional-details'>
        <label className='site'>Additional Details*</label>
        <ReactQuill
          className='quill'
          value={otherDetails.additionalDetails || ''}
          onChange={handleEditorChange}
          placeholder='Type Here...'
          modules={{
            toolbar: [
              [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
              [{ size: [] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' },
              { 'indent': '-1' }, { 'indent': '+1' }],
              ['link', 'image', 'video'],
              ['clean']
            ],
          }}
        />
      </div>
      <div>
        <button className='buton' onClick={onPrevious}>Previous</button>
        <button className='buton' onClick={handleFinalSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default OtherDetails;
