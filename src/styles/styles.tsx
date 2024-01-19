// ItemModalStyles.js

import { Box, styled } from '@mui/material';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';

export const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginLeft: 0,
  paddingLeft: theme.spacing(2),
  '& .MuiTypography-root': {
    flexGrow: 1,
    textAlign: 'left',
  },
  '& .MuiRadio-root': {
    paddingRight: 0,
  },
}));

export const StyledQuantityButton = styled(Button)({
  minWidth: '30px',
  width: '30px',
  height: '30px',
  padding: '0',
});

export const StyledAddButton = styled(Button)(({ theme }) => ({
  bgcolor: '#4F372F',
  borderRadius: '20px',
  padding: theme.spacing(1, 4),
  fontSize: '0.875rem',
  margin: theme.spacing(2, 'auto'),
  display: 'block',
  width: 'fit-content',
}));

const StyledButton = styled(Button)({
    // Add custom styles for the buttons here
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: '50%',
    border: 0,
    color: 'white',
    height: '40px',
    width: '40px',
    padding: '0',
  });

 export const QuantityBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > *': { // Aplica o estilo a todos os filhos diretos dentro deste Box
      margin: '0 8px', // Reduz o espaço entre os botões de menos e mais
    },
  });

// ... Exporte todos os outros estilos personalizados que você criar aqui
