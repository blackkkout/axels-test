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
import { BillingForm } from '../BillingForm/BillingForm';
import { PaymentForm } from '../PaymentForm/PaymentForm';

const pages = {
  0: ShippingForm,
  1: BillingForm,
  2: PaymentForm,
  3: OrderConfirmation,
};

export function Order() {
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
              <PageComponent onSubmit={handleNextPage} />
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
