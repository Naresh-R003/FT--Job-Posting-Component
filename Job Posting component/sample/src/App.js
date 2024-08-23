import React, { useState } from 'react';
import CheckoutStepper from './components/CheckoutStepper';
import JobInfo from './components/JobInfo';
import JobDetails from './components/JobDetails';
import JobRequirements from './components/JobRequirements';
import OtherDetails from './components/OtherDetails';
import './App.css';

const App = () => {
  const initialFormData = {
    jobInfo: {
      firstName1: '',
      firstName2: '',
      firstName3: '',
      firstName4: '',
      firstName5: '',
      firstName6: '',
      firstName7: '',
      firstName8: '',
      firstName9: '',
      firstName0: '',
      firstName11: ''
    },
    jobDetails: {
      selectedTags1: [],
      selectedTags2: [],
      selectedTags3: [],
      selectedTags4: []
    },
    jobRequirements: {
      workLocation: '',
      contactDetails: {
        firstName: '',
        lastName: '',
        designation: '',
        cardEmail: '',
        callingCode: '',
        mobileNumber: '',
        contactType: ''
      }
    },
    otherDetails: {
      siteSelection: '',
      primaryLanguage: '',
      secondaryLanguage: '',
      additionalDetails: ''
    }
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleFormChange = (step, data) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [step]: data
    }));
  };

  const stepsConfig = [
    { 
      name: 'Job Info', 
      Component: JobInfo, 
      formData: formData.jobInfo, 
      onNext: (data) => handleFormChange('jobInfo', data) 
    },
    { 
      name: 'Job Details', 
      Component: JobDetails, 
      formData: formData.jobDetails, 
      onNext: (data) => handleFormChange('jobDetails', data), 
      skipFieldValidation: true 
    },
    { 
      name: 'Job Requirements', 
      Component: JobRequirements, 
      formData: formData.jobRequirements, 
      onNext: (data) => handleFormChange('jobRequirements', data) 
    },
    { 
      name: 'Other Details', 
      Component: OtherDetails, 
      formData: formData.otherDetails, 
      onNext: (data) => handleFormChange('otherDetails', data) 
    }
  ];

  return (
    <div className="stepper-container">
      <CheckoutStepper stepsConfig={stepsConfig} />
    </div>
  );
};

export default App;
