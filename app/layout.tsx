import './globals.css';

import type { Metadata } from 'next';

import Providers from './providers';
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
      <head></head>
      <body className={`${roboto.className} antialiased`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
