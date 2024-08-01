import { styled } from '@mui/material';
import { palette } from './config';

export const Image = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: palette.grey[300],
});
