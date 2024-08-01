import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  Typography,
  TextField,
  Autocomplete,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Link,
} from '@mui/material';
import { LocationSearching } from '@mui/icons-material';

export const BillingForm = ({ onSubmit }) => {
  const countries = ['United States', 'Canada', 'Mexico', 'Ukraine'];

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        marginTop={3}
        marginBottom={2}
      >
        <Typography variant="h5" color="primary.main">
          Billing Information
        </Typography>
        <Link whiteSpace="nowrap" fontSize={12}>
          Same as shipping
        </Link>
      </Stack>
      <Stack spacing={2} marginBottom={2}>
        <Stack spacing={1}>
          <FormControl fullWidth>
            <FormLabel sx={{ marginBottom: 1, color: 'primary.main' }}>
              Billing Contact
            </FormLabel>
            <TextField placeholder="Full Name" size="small" fullWidth />
          </FormControl>
          <FormControl fullWidth>
            <TextField placeholder="Email Address" size="small" fullWidth />
          </FormControl>
        </Stack>
        <Stack spacing={1}>
          <FormControl fullWidth>
            <FormLabel sx={{ marginBottom: 1, color: 'primary.main' }}>
              Billing Address
            </FormLabel>
            <TextField placeholder="Street Address" size="small" fullWidth />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              placeholder="Apt, Suite, Bldg, Gate Code. (optional)"
              size="small"
              fullWidth
            />
          </FormControl>
        </Stack>
        <FormControl fullWidth>
          <OutlinedInput
            size="small"
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="get location" edge="end">
                  <LocationSearching />
                </IconButton>
              </InputAdornment>
            }
            placeholder="City"
          />
        </FormControl>
        <Stack spacing={2} direction="row">
          <FormControl fullWidth>
            <Autocomplete
              disablePortal
              options={countries}
              renderInput={(params) => (
                <TextField {...params} size="small" placeholder="Country" />
              )}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField placeholder="ZIP" size="small" fullWidth />
          </FormControl>
        </Stack>
      </Stack>
      <Button type="submit" variant="contained" fullWidth={false}>
        Continue
      </Button>
    </form>
  );
};
