import { Box, styled } from '@mui/material';

import { media } from '../styled/config';

export const Root = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  width: '100%',
  maxWidth: 700,
  maxHeight: '100%',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: theme.shadows[1],

  [media.md]: {},
}));
