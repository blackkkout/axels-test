import { Link, Stack, Typography } from '@mui/material';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export const Confirmation = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div ref={componentRef}>
        <Stack direction="column" gap={3}>
          <Typography
            variant="h5"
            color="primary.main"
            sx={{
              '@media print': {
                color: 'black',
              },
            }}
          >
            Thank you for your order!
          </Typography>
          <Stack direction="column" gap={1}>
            <Typography fontWeight={600}>Order number is: 123456789</Typography>
            <Typography lineHeight={1.25}>
              You will receive an email confirmation shortly to{' '}
              <Link
                sx={{
                  '@media print': {
                    color: 'black',
                  },
                }}
              >
                jonathan.smith@gmail.com
              </Link>
            </Typography>
          </Stack>
          <Typography lineHeight={1.25}>
            Estimated delivery day is <br />
            <b>Friday, July 15, 2022</b>
          </Typography>
        </Stack>
      </div>
      <Link fontSize={13} sx={{ cursor: 'pointer' }} onClick={handlePrint}>
        Print Recipe
      </Link>
    </div>
  );
};
