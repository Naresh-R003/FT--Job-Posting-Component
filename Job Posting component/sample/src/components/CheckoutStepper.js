import React, { useState, useEffect, useRef } from 'react';

const CheckoutStepper = ({ stepsConfig }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef([]);

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0]?.offsetWidth / 2,
      marginRight: stepRef.current[stepsConfig.length - 1]?.offsetWidth / 2,
    });
  }, [stepsConfig.length]);

  if (!stepsConfig.length) {
    return <></>;
  }

  const handleNext = (updatedData) => {
    const activeComponentData = { ...stepsConfig[currentStep - 1].formData, ...updatedData };
    stepsConfig[currentStep - 1].formData = activeComponentData;

    const skipFieldValidation = stepsConfig[currentStep - 1].skipFieldValidation;
    const allFieldsFilled = skipFieldValidation || Object.values(activeComponentData).every(value => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      if (typeof value === 'object' && value !== null) {
        return Object.values(value).every(subValue => subValue.trim() !== '');
      }
      return value.trim() !== '';
    });

    if (!allFieldsFilled) {
      alert('All details must be filled');
      return;
    }

    setCurrentStep((prevStep) => {
      if (prevStep === stepsConfig.length) {
        setIsComplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });

    const onFormChange = stepsConfig[currentStep - 1].onFormChange;
    if (typeof onFormChange === 'function') {
      onFormChange(activeComponentData);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === 1) {
        return prevStep;
      } else {
        return prevStep - 1;
      }
    });
  };

  const handleSubmit = () => {
    const activeComponentData = stepsConfig[currentStep - 1].formData;
    const skipFieldValidation = stepsConfig[currentStep - 1].skipFieldValidation;

    const allFieldsFilled = skipFieldValidation || Object.values(activeComponentData).every(value => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      if (typeof value === 'object' && value !== null) {
        return Object.values(value).every(subValue => subValue.trim() !== '');
      }
      return value.trim() !== '';
    });

    if (!allFieldsFilled) {
      alert('All details must be filled');
      return;
    }
    alert('Form submitted successfully!');
  };

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  };

  const ActiveComponent = stepsConfig[currentStep - 1]?.Component;

  return (
    <>
      <div className="stepper">
        {stepsConfig.map((step, index) => (
          <div
            key={index}
            ref={(el) => (stepRef.current[index] = el)}
            className={`step ${currentStep > index + 1 || isComplete ? 'complete' : ''} ${
              currentStep === index + 1 ? 'active' : ''
            } `}
          >
            <div className="step-number">
              {currentStep > index + 1 || isComplete ? <span>&#10003;</span> : index + 1}
            </div>
            <div className="step-name">{step.name}</div>
          </div>
        ))}

        <div
          className="progress-bar"
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div className="progress" style={{ width: `${calculateProgressBarWidth()}%` }}></div>
        </div>
      </div>
      <div>
        <ActiveComponent
          formData={stepsConfig[currentStep - 1].formData}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
          onFormChange={(data) => stepsConfig[currentStep - 1].onFormChange && stepsConfig[currentStep - 1].onFormChange(data)}
        />
      </div>
    </>
  );
};

export default CheckoutStepper;
