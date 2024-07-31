import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  Typography,
  TextField,
  Grid,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { ShieldTwoTone } from '@mui/icons-material';

export function PaymentForm({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography
        variant="h5"
        color="primary.main"
        marginTop={3}
        marginBottom={2}
      >
        Payment
      </Typography>
      <Stack spacing={2} marginBottom={2}>
        <Stack direction="row" alignItems="center">
          <ShieldTwoTone color="success" sx={{ marginRight: 1 }} />
          <Typography color={grey[500]} fontSize={14}>
            This is a secure 128-bit SSL encrypted payment
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <FormControl fullWidth>
            <FormLabel sx={{ marginBottom: 1, color: 'primary.main' }}>
              Cardholder Name
            </FormLabel>
            <TextField
              placeholder="Name as it appears on your card"
              size="small"
              fullWidth
            />
          </FormControl>
        </Stack>
        <Stack spacing={1}>
          <FormControl fullWidth>
            <FormLabel sx={{ marginBottom: 1, color: 'primary.main' }}>
              Card Number
            </FormLabel>
            <TextField
              placeholder="XXXX XXXX XXXX XXXX"
              size="small"
              fullWidth
            />
          </FormControl>
        </Stack>
        <Grid container gap={4}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <FormLabel sx={{ marginBottom: 1, color: 'primary.main' }}>
                Expiry Date
              </FormLabel>
              <TextField placeholder="MM / YY" size="small" fullWidth />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <FormLabel sx={{ marginBottom: 1, color: 'primary.main' }}>
                Security Code
              </FormLabel>
              <TextField size="small" fullWidth />
            </FormControl>
          </Grid>
        </Grid>
      </Stack>
      <Button type="submit" variant="contained" fullWidth={false}>
        Pay Securely
      </Button>
    </form>
  );
}
