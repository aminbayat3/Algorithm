import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const PlusButton = ({ onClick, name }) => {
  return (
    <Button variant="contained" color="secondary" endIcon={<AddIcon />} onClick={onClick}>
      {name}
    </Button>
  );
}

export default PlusButton;