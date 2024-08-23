import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ steps, currentStep }) => {
  return (
    <div className="progress-bar">
      {steps.map((step, index) => (
        <div key={index} className={`step ${index <= currentStep ? 'active' : ''}`}>
          <div className="step-number">{index + 1}</div>
          {index < steps.length - 1 && (
            <div className={`step-line ${index < currentStep ? 'active' : ''}`}></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
