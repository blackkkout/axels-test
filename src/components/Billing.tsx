import { useState } from 'react';
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
  FormHelperText,
  OutlinedInput,
  Link,
  CircularProgress,
} from '@mui/material';
import { LocationSearching } from '@mui/icons-material';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { getAddress } from '../api/address';
import { geolocationSelector } from '../redux/ducks/geolocation';

const validationSchema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  email: yup
    .string()
    .email('Email must be a valid email')
    .required('Email Address is required'),
  streetAddress: yup.string().required('Street Address is required'),
  apt: yup.string(),
  city: yup.string().required('City is required'),
  country: yup.string().required('Country is required'),
  zip: yup.string().required('ZIP is required'),
});

export const Billing = () => {
  const navigate = useNavigate();
  const [isAddressLoading, setIsAddressLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      streetAddress: '',
      apt: '',
      city: '',
      country: '',
      zip: '',
    },
    validationSchema,
    onSubmit: (_) => {
      navigate('/payment');
    },
  });

  const countries = ['United States', 'Canada', 'Mexico', 'Ukraine'];

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

  return (
    <form onSubmit={formik.handleSubmit}>
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
              name="email"
              placeholder="Email Address"
              size="small"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </FormControl>
        </Stack>
        <Stack spacing={1}>
          <FormControl fullWidth>
            <FormLabel sx={{ marginBottom: 1, color: 'primary.main' }}>
              Billing Address
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
