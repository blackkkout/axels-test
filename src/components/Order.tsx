import { useTheme, Box, Grid, Breadcrumbs, Link } from '@mui/material';
import { Outlet } from 'react-router-dom';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

import { Root } from '../styled/Order';
import { NavLink } from './NavLink';
import { Summary } from './Summary';
import { Confirmation } from './Confirmation';
import { useLocation } from 'react-router-dom';

export const Order = () => {
  const theme = useTheme();
  const location = useLocation();

  return (
    <Root>
      <Grid container height="100%">
        <Grid item md={7} sm={12} xs={12}>
          {location.pathname === '/confirmation' ? (
            <Box padding={theme.spacing(9, 4, 5, 5)}>
              <Confirmation />
            </Box>
          ) : (
            <Box padding={theme.spacing(2, 4, 5, 4)}>
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<NavigateNextRoundedIcon fontSize="medium" />}
              >
                <Link
                  component={NavLink}
                  underline="hover"
                  color="grey.400"
                  fontSize="small"
                  to="/"
                  sx={{
                    '&.active': {
                      color: 'primary.main',
                    },
                  }}
                >
                  Shipping
                </Link>
                <Link
                  component={NavLink}
                  underline="hover"
                  color="grey.400"
                  fontSize="small"
                  to="/billing"
                  sx={{
                    '&.active': {
                      color: 'primary.main',
                    },
                  }}
                >
                  Billing
                </Link>
                <Link
                  component={NavLink}
                  underline="hover"
                  color="grey.400"
                  fontSize="small"
                  to="/payment"
                  sx={{
                    '&.active': {
                      color: 'primary.main',
                    },
                  }}
                >
                  Payment
                </Link>
              </Breadcrumbs>
              <Outlet />
            </Box>
          )}
        </Grid>
        <Grid item md={5} sm={12} xs={12}>
          <Box height="100%" bgcolor="#F1F3F6">
            <Summary />
          </Box>
        </Grid>
      </Grid>
    </Root>
  );
};
