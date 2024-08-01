import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  Typography,
  TextField,
  Autocomplete,
} from '@mui/material';

export const ShippingForm = ({ onSubmit }) => {
  const countries = ['United States', 'Canada', 'Mexico', 'Ukraine'];

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
        Shipping Info
      </Typography>
      <Stack spacing={2} marginBottom={2}>
        <Stack spacing={1}>
          <FormControl fullWidth>
            <FormLabel sx={{ marginBottom: 1, color: 'primary.main' }}>
              Recipient
            </FormLabel>
            <TextField placeholder="Full Name" size="small" fullWidth />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              placeholder="Daytime Phone"
              size="small"
              fullWidth
              helperText="For delivery questions only"
            />
          </FormControl>
        </Stack>
        <Stack spacing={1}>
          <FormControl fullWidth>
            <FormLabel sx={{ marginBottom: 1, color: 'primary.main' }}>
              Address
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
          <TextField placeholder="City" size="small" fullWidth />
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
