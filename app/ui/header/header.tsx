'use client';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

export default function Header() {
  return (
    <AppBar position="static" className="mb-5">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: 'flex',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CYTI
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
            }}
          >
            <Link href="/dashboard" className="my-2 mx-2  text-white block">
              Estadísticas
            </Link>
            <Link href="/payroll" className="my-2 text-white block">
              Generar nómina
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
