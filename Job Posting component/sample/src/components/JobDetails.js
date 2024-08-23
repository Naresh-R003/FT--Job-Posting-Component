import React, { useState, useEffect } from 'react';
import './JobDetails.css';
import TagsInput from './TagsInput';

const JobDetails = ({ formData, onNext, onPrevious, onFormChange }) => {
  const [selectedTags1, setSelectedTags1] = useState(formData.selectedTags1 || []);
  const [selectedTags2, setSelectedTags2] = useState(formData.selectedTags2 || []);
  const [selectedTags3, setSelectedTags3] = useState(formData.selectedTags3 || []);
  const [selectedTags4, setSelectedTags4] = useState(formData.selectedTags4 || []);

  const tags1 = ["Tutorial", "HowTo", "DIY", "Review", "Tech", "Gaming", "Travel", "Fitness", "Cooking", "Vlog"];
  const tags2 = ["spanner", "Screw driver", "Thinner", "Brush", "Mask"];
  const tags3 = ["one", "two", "three"];
  const tags4 = ["one", "two", "three"];

  useEffect(() => {
    setSelectedTags1(formData.selectedTags1 || []);
    setSelectedTags2(formData.selectedTags2 || []);
    setSelectedTags3(formData.selectedTags3 || []);
    setSelectedTags4(formData.selectedTags4 || []);
  }, [formData]);

  const handleSubmit = () => {
    if (selectedTags1.length > 0 && selectedTags2.length > 0 && selectedTags3.length > 0 && selectedTags4.length > 0) {
      const updatedJobDetails = {
        selectedTags1,
        selectedTags2,
        selectedTags3,
        selectedTags4
      };
      onNext(updatedJobDetails);
    } else {
      alert('All tag fields must have at least one tag selected');
    }
  };

  return (
    <div>
      <div className='tags-main-container'>
        <div className='tags-container'>
          <div>Select tools* <TagsInput tags={tags1} selectedTags={selectedTags1} onSelectedTagsChange={setSelectedTags1} /></div>
           <div>Select Skills* <TagsInput tags={tags2} selectedTags={selectedTags2} onSelectedTagsChange={setSelectedTags2} /></div>
          
        </div>
        <div className='tags-container'>
        <div>Select Tasks* <TagsInput tags={tags3} selectedTags={selectedTags3} onSelectedTagsChange={setSelectedTags3} /></div>
        <div>Select Safety Wears* <TagsInput tags={tags4} selectedTags={selectedTags4} onSelectedTagsChange={setSelectedTags4} /></div>
        </div>
      </div>
      <div className='job-button'>
        <button className='buton' onClick={onPrevious}>Previous</button>
        <button className='buton' onClick={handleSubmit}>Next</button>
      </div>
    </div>
  );
};

export default JobDetails;
