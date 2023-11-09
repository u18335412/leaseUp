import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { headers } from "next/headers";
import "../styles/globals.css";
import Layout from "@/components/layout";
import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font";
import { Toaster } from "react-hot-toast";

const font = Sora({ subsets: ["latin"] });

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
      <TRPCReactProvider headers={headers()}>
        <html lang="en">
          <body className={font.className}>
            <Layout>{children}</Layout>
            <Toaster position="top-right" />
          </body>
        </html>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}
