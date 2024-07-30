import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  Typography,
  TextField,
  Autocomplete,
} from '@mui/material';

export function ShippingForm() {
  const countries = ['United States', 'Canada', 'Mexico', 'Ukraine'];

  return (
    <form>
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
            <TextField label="Full Name" size="small" fullWidth />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Daytime Phone"
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
            <TextField label="Street Address" size="small" fullWidth />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Apt, Suite, Bldg, Gate Code. (optional)"
              size="small"
              fullWidth
            />
          </FormControl>
        </Stack>
        <FormControl fullWidth>
          <TextField label="City" size="small" fullWidth />
        </FormControl>
        <Stack spacing={2} direction="row">
          <FormControl fullWidth>
            <Autocomplete
              disablePortal
              options={countries}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Country" />
              )}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField label="ZIP" size="small" fullWidth />
          </FormControl>
        </Stack>
      </Stack>
      <Button variant="contained" fullWidth={false}>
        Continue
      </Button>
    </form>
  );
}
