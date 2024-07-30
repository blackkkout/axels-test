import { styled } from '@mui/material';
import { grey } from '@mui/material/colors';

export const Image = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: grey[300],
});
