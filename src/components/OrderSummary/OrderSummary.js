import {
  Box,
  Divider,
  Link,
  List,
  ListItem,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { OrderItem } from '../OrderItem/OrderItem';

export function OrderSummary() {
  const theme = useTheme();
  const orders = [
    {
      id: 1,
      name: 'The Chelsea Boot',
      price: '$235',
      shape: 'black',
      quantity: 1,
      image:
        'https://www.jackerwin.com/cdn/shop/products/EllisBlack_Profile_960x_crop_center.jpg?v=1673021220',
    },
    {
      id: 2,
      name: 'The Chelsea Boot',
      price: '$235',
      shape: 'black',
      quantity: 1,
      image:
        'https://www.jackerwin.com/cdn/shop/products/EllisBlack_Profile_960x_crop_center.jpg?v=1673021220',
    },
    {
      id: 3,
      name: 'The Chelsea Boot',
      price: '$235',
      shape: 'black',
      quantity: 1,
      image:
        'https://www.jackerwin.com/cdn/shop/products/EllisBlack_Profile_960x_crop_center.jpg?v=1673021220',
    },
  ];

  return (
    <Box padding={theme.spacing(2, 2, 5, 1)}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={1}
      >
        <Typography color="primary.main">Order Summary</Typography>
        <Link color={grey[500]} fontSize={14}>
          edit order
        </Link>
      </Stack>
      <Stack spacing={1.5}>
        {orders.map((order) => (
          <div key={order.id}>
            <OrderItem order={order} />
            <Divider />
          </div>
        ))}
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        fontSize={12}
        color={grey[600]}
      >
        <List>
          <ListItem sx={{ padding: 0 }}>Subtotal</ListItem>
          <ListItem sx={{ padding: 0 }}>Shipping</ListItem>
          <ListItem sx={{ padding: 0 }}>Taxes</ListItem>
        </List>
        <List>
          <ListItem sx={{ padding: 0, justifyContent: 'flex-end' }}>
            $398
          </ListItem>
          <ListItem sx={{ padding: 0, justifyContent: 'flex-end' }}>
            Free
          </ListItem>
          <ListItem sx={{ padding: 0, justifyContent: 'flex-end' }}>
            $12.12
          </ListItem>
        </List>
      </Stack>
      <Divider />
      <Stack
        direction="row"
        justifyContent="space-between"
        marginTop={1}
        fontSize={13}
      >
        <Typography color="primary.main" fontWeight={600} fontSize="inherit">
          Total
        </Typography>
        <Typography color="primary.main" fontWeight={600} fontSize="inherit">
          $410.12
        </Typography>
      </Stack>
    </Box>
  );
}
