import { Stack, Typography, Box } from '@mui/material';

import { Image } from '../styled/Item';
import { Order } from '../types/order';

interface ItemProps {
  order: Order;
}

export const Item = ({ order }: ItemProps) => (
  <Stack marginBottom={1} direction="row" justifyContent="space-between">
    <Stack direction="row">
      <Box width={50} height={50} marginRight={1}>
        <Image src={order.image} alt={order.name} />
      </Box>
      <Stack direction="column" fontSize={11}>
        <Typography fontSize="inherit" color="grey.600">
          {order.name}
        </Typography>
        <Typography fontSize="inherit">
          {order.shape}
          <br />
          Quantity: {order.quantity}
        </Typography>
      </Stack>
    </Stack>
    <Typography fontSize={11} color="grey.600">
      {order.price}
    </Typography>
  </Stack>
);
