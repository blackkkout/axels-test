import { useEffect, useState } from 'react';
import { LocationSearching } from '@mui/icons-material';
import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  Typography,
  TextField,
  Autocomplete,
  FormHelperText,
  IconButton,
  InputAdornment,
  CircularProgress,
  OutlinedInput,
  Alert,
} from '@mui/material';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { geolocationSelector } from '../redux/ducks/geolocation/geolocation';
import { getAddress } from '../api/address';
import { postShipping } from '../api/orders';
import { useDebounce } from '../hooks/useDebounce';

const validationSchema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  daytimePhone: yup.string().required('Daytime Phone is required'),
  streetAddress: yup.string().required('Street Address is required'),
  apt: yup.string(),
  city: yup.string().required('City is required'),
  country: yup.string().required('Country is required'),
  zip: yup.string().required('ZIP is required'),
});

export type ShippingFormValues = yup.InferType<typeof validationSchema>;

export const Shipping = () => {
  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      fullName: '',
      daytimePhone: '',
      streetAddress: '',
      apt: '',
      city: '',
      country: '',
      zip: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await postShipping(values);
        if (data?.success) {
          navigate('/billing');
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    },
  });

  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const coords = useSelector(geolocationSelector);

  const handleGetAddress = async () => {
    if (coords && coords.latitude && coords.longitude) {
      try {
        setIsAddressLoading(true);
        const data = await getAddress(coords.latitude, coords.longitude);

        formik.setFieldValue('streetAddress', data.address.road || '');
        formik.setFieldValue('apt', data.address.house_number || '');
        formik.setFieldValue(
          'city',
          data.address.city || data.address.town || '',
        );
        formik.setFieldValue('country', data.address.country || '');
        formik.setFieldValue('zip', data.address.postcode || '');
      } catch (error) {
        console.error(error);
      } finally {
        setIsAddressLoading(false);
      }
    }
  };

  const countries = ['United States', 'Canada', 'Mexico', 'Ukraine'];

  const debouncedFormikValues = useDebounce(formik.values, 1000);

  useEffect(() => {
    const values = JSON.parse(localStorage.getItem('shipping') || '{}');
    formik.setValues({
      fullName: values.fullName || '',
      daytimePhone: values.daytimePhone || '',
      streetAddress: values.streetAddress || '',
      apt: values.apt || '',
      city: values.city || values.town || '',
      country: values.country || '',
      zip: values.zip || '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!Object.values(debouncedFormikValues).every((value) => value === '')) {
      localStorage.setItem('shipping', JSON.stringify(debouncedFormikValues));
    }
  }, [debouncedFormikValues]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography
        variant="h5"
        color="primary.main"
        marginTop={3}
        marginBottom={2}
      >
        Shipping Info
      </Typography>
      <Stack spacing={2} marginBottom={2}>
        {error && <Alert severity="error">{error}</Alert>}
        <Stack spacing={1}>
          <FormControl fullWidth>
            <FormLabel sx={{ marginBottom: 1, color: 'primary.main' }}>
              Recipient
            </FormLabel>
            <TextField
              name="fullName"
              placeholder="Full Name"
              size="small"
              fullWidth
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              name="daytimePhone"
              placeholder="Daytime Phone"
              size="small"
              fullWidth
              value={formik.values.daytimePhone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.daytimePhone &&
                Boolean(formik.errors.daytimePhone)
              }
              helperText={
                (formik.touched.daytimePhone && formik.errors.daytimePhone) ||
                'For delivery questions only'
              }
            />
          </FormControl>
        </Stack>
        <Stack spacing={1}>
          <FormControl fullWidth>
            <FormLabel sx={{ marginBottom: 1, color: 'primary.main' }}>
              Address
            </FormLabel>
            <TextField
              name="streetAddress"
              placeholder="Street Address"
              size="small"
              fullWidth
              value={formik.values.streetAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.streetAddress &&
                Boolean(formik.errors.streetAddress)
              }
              helperText={
                formik.touched.streetAddress && formik.errors.streetAddress
              }
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              name="apt"
              placeholder="Apt, Suite, Bldg, Gate Code. (optional)"
              size="small"
              fullWidth
              value={formik.values.apt}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.apt && Boolean(formik.errors.apt)}
              helperText={formik.touched.apt && formik.errors.apt}
            />
          </FormControl>
        </Stack>
        <FormControl fullWidth>
          <OutlinedInput
            name="city"
            size="small"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="get location"
                  edge="end"
                  onClick={handleGetAddress}
                  disabled={isAddressLoading || !coords}
                >
                  {isAddressLoading ? (
                    <CircularProgress size={24} />
                  ) : (
                    <LocationSearching />
                  )}
                </IconButton>
              </InputAdornment>
            }
            placeholder="City"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.city && Boolean(formik.errors.city)}
          />
          {formik.touched.city && formik.errors.city && (
            <FormHelperText sx={{ color: 'error.main' }}>
              {formik.errors.city}
            </FormHelperText>
          )}
        </FormControl>
        <Stack spacing={2} direction="row">
          <FormControl fullWidth>
            <Autocomplete
              freeSolo
              disablePortal
              options={countries}
              value={formik.values.country}
              getOptionLabel={(option) => option}
              onChange={(_, value) => formik.setFieldValue('country', value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="country"
                  size="small"
                  placeholder="Country"
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.country && Boolean(formik.errors.country)
                  }
                  helperText={formik.touched.country && formik.errors.country}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              name="zip"
              placeholder="ZIP"
              size="small"
              fullWidth
              value={formik.values.zip}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.zip && Boolean(formik.errors.zip)}
              helperText={formik.touched.zip && formik.errors.zip}
            />
          </FormControl>
        </Stack>
      </Stack>
      <Button type="submit" variant="contained" fullWidth={false}>
        Continue
      </Button>
    </form>
  );
};
