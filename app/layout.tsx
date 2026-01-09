import './globals.css';

import type { Metadata } from 'next';

import ThemeRegistry from './theme-registry';
import { roboto } from './ui/fonts';
import Header from './ui/header/header';

export const metadata: Metadata = {
  title: 'CYTI ADMIN',
  description: 'Project by Next Js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body className={`${roboto.className} antialiased`}>
        <ThemeRegistry>
          <Header />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
