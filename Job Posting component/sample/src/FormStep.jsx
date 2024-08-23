import React from 'react';
import './FormStep.css';

const FormStep = ({ currentStep }) => {
  switch (currentStep) {
    case 0:
      return <div className="form-step form-step-active">Job Info Form Content</div>;
    case 1:
      return <div className="form-step form-step-active">Job Requirements Form Content</div>;
    case 2:
      return <div className="form-step form-step-active">Contact Details Form Content</div>;
    case 3:
      return <div className="form-step form-step-active">Other Details Form Content</div>;
    default:
      return null;
  }
};

export default FormStep;
