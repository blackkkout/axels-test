import { useState } from 'react';
import {
  useTheme,
  Box,
  Grid,
  Breadcrumbs,
  Link,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { NavigateNextRounded } from '@mui/icons-material';

import { Root } from './Order.styles';
import { OrderSummary } from '../OrderSummary/OrderSummary';
import { OrderConfirmation } from '../OrderConfirmation/OrderConfirmation';
import { ShippingForm } from '../ShippingForm/ShippingForm';

export function Order() {
  const theme = useTheme();
  const [isOrderConfirmed] = useState(true);

  return (
    <Root>
      <Grid container height="100%">
        <Grid item xs={7}>
          {isOrderConfirmed ? (
            <Box padding={theme.spacing(9, 4, 5, 5)}>
              <OrderConfirmation />
            </Box>
          ) : (
            <Box padding={theme.spacing(2, 4, 5, 4)}>
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<NavigateNextRounded fontSize="medium" />}
              >
                <Typography color="primary.main" fontSize="small">
                  Shipping
                </Typography>
                <Link
                  underline="hover"
                  color={grey[400]}
                  fontSize="small"
                  href="#"
                >
                  Billing
                </Link>
                <Link
                  underline="hover"
                  color={grey[400]}
                  fontSize="small"
                  href="#"
                >
                  Payment
                </Link>
              </Breadcrumbs>
              <ShippingForm />
            </Box>
          )}
        </Grid>
        <Grid item xs={5}>
          <Box height="100%" bgcolor="#F1F3F6">
            <OrderSummary />
          </Box>
        </Grid>
      </Grid>
    </Root>
  );
}
