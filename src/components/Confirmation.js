import { Link, Stack, Typography } from '@mui/material';

export const Confirmation = () => (
  <Stack direction="column" gap={3}>
    <Typography variant="h5" color="primary.main">
      Thank you for your order!
    </Typography>
    <Stack direction="column" gap={1}>
      <Typography fontWeight={600}>Order number is: 123456789</Typography>
      <Typography lineHeight={1.25}>
        You will receive an email confirmation shortly to{' '}
        <Link>jonathan.smith@gmail.com</Link>
      </Typography>
    </Stack>
    <Typography lineHeight={1.25}>
      Estimated delivery day is <br />
      <b>Friday, July 15, 2022</b>
    </Typography>
    <Link fontSize={13}>Print Recipe</Link>
  </Stack>
);
