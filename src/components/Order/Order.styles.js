import { Box, styled } from '@mui/material';

export const Root = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  width: 640,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: theme.shadows[1],
}));
