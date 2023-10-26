import "../styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Layout from "@/components/layout";

const font = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LeaseUp",
  description:
    "Affordable property management app for landlords and tenants. Manage your properties, collect rent, and screen tenants with ease.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <Layout>{children}</Layout>
        </body>
      </html>
    </ClerkProvider>
  );
}
