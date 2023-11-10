import { ReactNode, Suspense } from "react";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-heading";
import { ClientTabs } from "@/components/properties/clientLayoutTabs";
import { LayoutHeader } from "@/components/properties/layoutHeader";
import { Skeleton } from "ui";

const LayoutHeaderSkeleton = () => (
  <PageHeader>
    <PageHeaderHeading>
      <Skeleton className="h-7 w-32" />
    </PageHeaderHeading>
    <PageHeaderDescription>
      <Skeleton className="h-6 w-64" />
    </PageHeaderDescription>
  </PageHeader>
);

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) => {
  return (
    <div>
      <Suspense fallback={<LayoutHeaderSkeleton />}>
        <LayoutHeader id={params.id} />
      </Suspense>
      <ClientTabs id={params.id} />

      <div className="mt-6">{children}</div>
    </div>
  );
};

export default Layout;
