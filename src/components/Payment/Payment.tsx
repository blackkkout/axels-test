import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  Typography,
  TextField,
  Grid,
  Alert,
} from '@mui/material';
import ShieldTwoToneIcon from '@mui/icons-material/ShieldTwoTone';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { postPayment } from '../../api/orders';

const validationSchema = yup.object().shape({
  name: yup.string().required('Cardholder Name is required'),
  number: yup.string().required('Card Number is required'),
  exp: yup.string().required('Expiry Date is required'),
  cvc: yup.string().required('Security Code is required'),
});

export type PaymentFormValues = yup.InferType<typeof validationSchema>;

export const Payment = () => {
  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
      exp: '',
      cvc: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await postPayment(values);
        if (data?.success) {
          navigate('/confirmation');
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
          <ShieldTwoToneIcon color="success" sx={{ marginRight: 1 }} />
          <Typography color="grey.500" fontSize={14}>
            This is a secure 128-bit SSL encrypted payment
          </Typography>
        </Stack>
        {error && <Alert severity="error">{error}</Alert>}
        <Stack spacing={1}>
          <FormControl fullWidth>
            <FormLabel sx={{ marginBottom: 1, color: 'primary.main' }}>
              Cardholder Name
            </FormLabel>
            <TextField
              name="name"
              placeholder="Name as it appears on your card"
              size="small"
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </FormControl>
        </Stack>
        <Stack spacing={1}>
          <FormControl fullWidth>
            <FormLabel sx={{ marginBottom: 1, color: 'primary.main' }}>
              Card Number
            </FormLabel>
            <TextField
              name="number"
              placeholder="XXXX XXXX XXXX XXXX"
              size="small"
              fullWidth
              value={formik.values.number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.number && Boolean(formik.errors.number)}
              helperText={formik.touched.number && formik.errors.number}
            />
          </FormControl>
        </Stack>
        <Grid container gap={4}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <FormLabel sx={{ marginBottom: 1, color: 'primary.main' }}>
                Expiry Date
              </FormLabel>
              <TextField
                name="exp"
                placeholder="MM / YY"
                size="small"
                fullWidth
                value={formik.values.exp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.exp && Boolean(formik.errors.exp)}
                helperText={formik.touched.exp && formik.errors.exp}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <FormLabel sx={{ marginBottom: 1, color: 'primary.main' }}>
                Security Code
              </FormLabel>
              <TextField
                name="cvc"
                size="small"
                fullWidth
                value={formik.values.cvc}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.cvc && Boolean(formik.errors.cvc)}
                helperText={formik.touched.cvc && formik.errors.cvc}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Stack>
      <Button type="submit" variant="contained" fullWidth={false}>
        Pay Securely
      </Button>
    </form>
  );
};
