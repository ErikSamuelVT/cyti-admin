import { Typography } from '@mui/material';

export default function Title({ title }: { title: string }) {
  return (
    <Typography variant="h5" className="font-semibold">
      {title}
    </Typography>
  );
}
