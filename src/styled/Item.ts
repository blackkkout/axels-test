import { styled } from '@mui/material';

export const Image = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.palette.grey[300],
}));
