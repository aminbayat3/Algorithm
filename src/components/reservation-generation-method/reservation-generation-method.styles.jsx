import { styled } from "@mui/material"

import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';


export const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    '& .MuiTypography-root': { 
        fontSize: '0.93rem',
      }
}));

export const StyledRadioButton = styled(Radio)(({ theme }) => ({
    '& .MuiSvgIcon-root': { 
        fontSize: 18.5, 
      },
      '& .MuiTouchRipple-root': {
        borderRadius: '50%',
        width: '35px', 
        height: '35px',
      }
}));