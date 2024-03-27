import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const PlusButton = ({ onClick }) => {
  return (
    <Button variant="contained" color="secondary" endIcon={<AddIcon />} onClick={onClick}>
      Add
    </Button>
  );
}

export default PlusButton;