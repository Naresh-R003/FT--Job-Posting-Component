import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostJobButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/employee_details');
  };

  return (
    <button onClick={handleClick} style={styles.button}>
      Post Job
    </button>
  );
};

const styles = {
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default PostJobButton;
