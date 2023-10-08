import '../styles/globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import Layout from '@/components/Layout';
const inter = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LeaseUp',
  description:
    'Affordable property management app for landlords and tenants. Manage your properties, collect rent, and screen tenants with ease.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Layout>{children}</Layout>
        </body>
      </html>
    </ClerkProvider>
  );
}
