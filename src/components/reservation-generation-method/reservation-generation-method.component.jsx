import * as React from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { StyledRadioButton, StyledFormControlLabel } from './reservation-generation-method.styles';

const ReservationGenerationMethod = ({ generationMethod, onChange }) => {

    return (
        <FormControl sx={{margin: "0 30px"}}>
        <FormLabel sx={{fontSize: "14px"}} id="demo-radio-buttons-group-label">Generation Method</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="manually"
          name="generationMethod"
          value={generationMethod}
          onChange={onChange}
        >
          <StyledFormControlLabel value="manually" control={<StyledRadioButton  />} label="Maually" />
          <StyledFormControlLabel value="randomly" control={<StyledRadioButton  />} label="Randomly" />
        </RadioGroup>
      </FormControl>
    )
}

export default ReservationGenerationMethod;