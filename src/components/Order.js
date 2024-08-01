import { useState } from 'react';
import {
  useTheme,
  Box,
  Grid,
  Breadcrumbs,
  Link,
  Typography,
} from '@mui/material';
import { NavigateNextRounded } from '@mui/icons-material';

import { Root } from '../styled/Order';
import { ShippingForm } from './ShippingForm';
import { BillingForm } from './BillingForm';
import { PaymentForm } from './PaymentForm';
import { OrderSummary } from './OrderSummary';
import { OrderConfirmation } from './OrderConfirmation';

const pages = {
  0: ShippingForm,
  1: BillingForm,
  2: PaymentForm,
  3: OrderConfirmation,
};

export const Order = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const isOrderConfirmed = page === 3;

  const PageComponent = pages[page];

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Root>
      <Grid container height="100%">
        <Grid item md={7} sm={12} xs={12}>
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
                  color="grey.400"
                  fontSize="small"
                  href="#"
                >
                  Billing
                </Link>
                <Link
                  underline="hover"
                  color="grey.400"
                  fontSize="small"
                  href="#"
                >
                  Payment
                </Link>
              </Breadcrumbs>
              <PageComponent onSubmit={handleNextPage} />
            </Box>
          )}
        </Grid>
        <Grid item md={5} sm={12} xs={12}>
          <Box height="100%" bgcolor="#F1F3F6">
            <OrderSummary />
          </Box>
        </Grid>
      </Grid>
    </Root>
  );
};
