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
import { BillingForm } from '../BillingForm/BillingForm';

export function Order() {
  const theme = useTheme();

  return (
    <Root>
      <Grid container height="100%">
        <Grid item xs={7}>
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
            <BillingForm />
          </Box>
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
