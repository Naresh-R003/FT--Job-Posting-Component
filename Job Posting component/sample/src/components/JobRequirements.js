import React, { useState, useEffect } from 'react';

const JobRequirements = ({ formData, onNext, onPrevious, onFormChange }) => {
  const [jobRequirements, setJobRequirements] = useState(formData);
  const [showModal, setShowModal] = useState(false);
  const [contactDetails, setContactDetails] = useState({
    firstName: '',
    lastName: '',
    designation: '',
    cardEmail: '',
    callingCode: '',
    mobileNumber: '',
    contactType: ''
  });
  const [savedContactDetails, setSavedContactDetails] = useState(formData.contactDetails || null);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    setJobRequirements(formData);
    if (formData.contactDetails) {
      setContactDetails(formData.contactDetails);
      setSavedContactDetails(formData.contactDetails);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedJobRequirements = { ...jobRequirements, [name]: value };
    setJobRequirements(updatedJobRequirements);
    onFormChange(updatedJobRequirements);
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactDetails({ ...contactDetails, [name]: value });
  };

  const handleAddContact = () => {
    const allContactFieldsFilled = Object.values(contactDetails).every(value => value.trim() !== '');

    if (!allContactFieldsFilled) {
      setValidationError('All contact details must be filled');
      return;
    }

    setSavedContactDetails(contactDetails);
    setShowModal(false);
    setValidationError('');
  };

  const closeModal = () => {
    setShowModal(false);
    setValidationError('');
  };

  const handleNext = () => {
    const { workLocation } = jobRequirements;
    const allFieldsFilled = workLocation.trim() !== '' && savedContactDetails !== null;

    if (!allFieldsFilled) {
      setValidationError('All details must be filled');
      return;
    }

    const updatedData = { ...jobRequirements, contactDetails: savedContactDetails };
    onFormChange(updatedData);
    setValidationError('');
    onNext(updatedData);
  };

  return (
    <div style={{ width: "600px" }}>
      <h2>Job Requirements</h2> <br></br>
      <div style={{ width: "152%" }}>
        {/* <label>
          Work Location*<br></br>
          
          <input
            className='in'
            type="text"
            name="workLocation"
            value={jobRequirements.workLocation}
            onChange={handleChange}
          />
        </label> */}
         <div className='input-flex'>
              <div className="input-group input2">
                <input className='in' type="text" name="workLocation" value={jobRequirements.workLocation} onChange={handleChange} required />
                <label>Work Location*</label>
              </div>
            </div>
        {/* Google Maps iframe */}
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.2649874311105!2d80.24155427478826!3d12.954888187358879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d8e784d0849%3A0xd7cbc57b04065c0e!2sTeceze%20Consultancy%20Services%20Private%20Limited!5e0!3m2!1sen!2sin!4v1718878520860!5m2!1sen!2sin"
            style={{ width: "100%", height: "50vh", padding: "20px", border: "0", loading: "lazy", referrerPolicy: "no-referrer-when-downgrade" }}
          />
        </div>
      </div>
      <div style={{ paddingTop: "50px" }}>
        <label onClick={() => setShowModal(true)} style={{ cursor: "pointer" }}>
          Point of Contact*
        </label>
        {savedContactDetails && (
          <div style={{ marginTop: "20px" }}>
            <p><strong>First Name:</strong> {savedContactDetails.firstName}</p>
            <p><strong>Last Name:</strong> {savedContactDetails.lastName}</p>
            <p><strong>Designation:</strong> {savedContactDetails.designation}</p>
            <p><strong>Email ID:</strong> {savedContactDetails.cardEmail}</p>
            <p><strong>Calling Code:</strong> {savedContactDetails.callingCode}</p>
            <p><strong>Mobile Number:</strong> {savedContactDetails.mobileNumber}</p>
            <p><strong>Contact Type:</strong> {savedContactDetails.contactType}</p>
          </div>
        )}
      </div>
      {validationError && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          {validationError}
        </div>
      )}
      <button className='buton' onClick={onPrevious}>Previous</button>
      <button className='buton' onClick={handleNext}>Next</button>

      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h2>Point of Contact</h2>
            <div className='input-flex contact-card'>
              <div className="input-group card-inp">
                <input className='inputs in ' type="text" name="firstName" value={contactDetails.firstName} onChange={handleContactChange} required />
                <label>First Name*</label>
              </div>
              <div className="input-group card-inp">
                <input className='inputs in' type="text" name="lastName" value={contactDetails.lastName} onChange={handleContactChange} required />
                <label>Last Name*</label>
              </div>
            </div>
            <div className='input-flex'>
              <div className="input-group input2">
                <input className='in' type="text" name="designation" value={contactDetails.designation} onChange={handleContactChange} required />
                <label>Designation*</label>
              </div>
            </div>
            <div className='input-flex '>
              <div className="input-group input2">
                <input className='inputs in' type="email" name="cardEmail" value={contactDetails.cardEmail} onChange={handleContactChange} required />
                <label>Email ID*</label>
              </div>
             
            </div>
            <div className='input-flex contact-card'>
            <div className="input-group card-inp">
                <input className='inputs in' type="text" name="callingCode" value={contactDetails.callingCode} onChange={handleContactChange} required />
                <label>Calling Code*</label>
              </div>
              <div className="input-group card-inp">
                <input className='inputs in' type="text" name="mobileNumber" value={contactDetails.mobileNumber} onChange={handleContactChange} required />
                <label>Mobile Number*</label>
              </div>
             
            </div>
            <div className='input-flex '>
              <div className="input-group input2">
                <input className='inputs in' type="text" name="contactType" value={contactDetails.contactType} onChange={handleContactChange} required />
                <label>Contact Type*</label>
              </div>
             
            </div>
            {validationError && (
              <div style={{ color: 'red', marginBottom: '20px' }}>
                {validationError}
              </div>
            )}
            <button className='buton' onClick={handleAddContact}>Save Contact</button>
            <button className='buton' onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modalStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  width: '80%',
  maxWidth: '500px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

export default JobRequirements;
