import { Grid, Stack, Typography, Box } from '@mui/material';
import { grey } from '@mui/material/colors';

import { Image } from './OrderItem.styles';

export function OrderItem({ order }) {
  return (
    <Grid container marginBottom={1}>
      <Grid item xs={3}>
        <Box width={50} height={50}>
          <Image src={order.image} alt={order.name} />
        </Box>
      </Grid>
      <Grid item xs={9}>
        <Stack fontSize={11} direction="row" justifyContent="space-between">
          <Stack direction="column">
            <Typography fontSize="inherit" color={grey[600]}>
              {order.name}
            </Typography>
            <Typography fontSize="inherit">
              {order.shape}
              <br />
              Quantity: {order.quantity}
            </Typography>
          </Stack>
          <Typography fontSize="inherit" color={grey[600]}>
            {order.price}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}
