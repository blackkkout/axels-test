import { useEffect } from 'react';
import {
  Box,
  CircularProgress,
  Divider,
  Link,
  List,
  ListItem,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { Item } from './Item';
import {
  ordersActions,
  ordersSelector,
  ordersStatusSelector,
  ordersSummarySelector,
} from '../redux/ducks/orders';

export const Summary = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const orders = useSelector(ordersSelector);
  const status = useSelector(ordersStatusSelector);
  const summary = useSelector(ordersSummarySelector);

  useEffect(() => {
    dispatch(ordersActions.getData());
  }, [dispatch]);

  return (
    <Box padding={theme.spacing(2, 2, 5, 1)}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems=""
        marginBottom={1}
      >
        <Typography color="primary.main">Order Summary</Typography>
        <Link color="grey.500" fontSize={12}>
          edit order
        </Link>
      </Stack>
      {status === 'loading' ? (
        <Stack direction="row" justifyContent="center">
          <CircularProgress />
        </Stack>
      ) : (
        <>
          <Stack spacing={1.5}>
            {orders.map((order) => (
              <div key={order.id}>
                <Item order={order} />
                <Divider />
              </div>
            ))}
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            fontSize={12}
            color="grey.600"
          >
            <List>
              <ListItem sx={{ padding: 0 }}>Subtotal</ListItem>
              <ListItem sx={{ padding: 0 }}>Shipping</ListItem>
              <ListItem sx={{ padding: 0 }}>Taxes</ListItem>
            </List>
            <List>
              <ListItem sx={{ padding: 0, justifyContent: 'flex-end' }}>
                ${summary?.subtotal}
              </ListItem>
              <ListItem sx={{ padding: 0, justifyContent: 'flex-end' }}>
                {!summary?.shipping ? 'Free' : summary?.shipping}
              </ListItem>
              <ListItem sx={{ padding: 0, justifyContent: 'flex-end' }}>
                ${summary?.taxes}
              </ListItem>
            </List>
          </Stack>
          <Divider />
          <Stack
            direction="row"
            justifyContent="space-between"
            marginTop={1}
            fontSize={12}
          >
            <Typography
              color="primary.main"
              fontWeight={600}
              fontSize="inherit"
            >
              Total
            </Typography>
            <Typography
              color="primary.main"
              fontWeight={600}
              fontSize="inherit"
            >
              ${summary?.subtotal! + summary?.shipping! + summary?.taxes!}
            </Typography>
          </Stack>
        </>
      )}
    </Box>
  );
};
