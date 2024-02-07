"use client";

import { Skeleton } from "ui";
import { Breadcrumb } from "../breadcrumb";
import {
  PageHeaderHeading,
  PageHeaderDescription,
  PageHeader,
} from "../page-heading";
import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";

const propertyAddress = ({
  street,
  city,
  province,
  country,
}: {
  street: string;
  city: string;
  province: string;
  country: string;
}) => `${street}, ${city}, ${province}, ${country}.`;

export const LayoutHeader = ({ id }: { id: string }) => {
  const property = api.property.getById.useQuery({
    propertyId: id,
  });

  if (property.isLoading) {
    return (
      <PageHeader>
        <PageHeaderHeading>
          <Skeleton className="h-7 w-32" />
        </PageHeaderHeading>
        <PageHeaderDescription>
          <Skeleton className="h-6 w-64" />
        </PageHeaderDescription>
      </PageHeader>
    );
  }

  return (
    <div>
      <div>
        <Breadcrumb
          links={[
            {
              href: "/properties",
              name: "Properties",
              current: false,
            },
            {
              href: `/properties/${id}`,
              name: property.data?.name as string,
              current: true,
            },
          ]}
        />
      </div>
      <PageHeader>
        <PageHeaderHeading className="md:text-lg">
          {property.data?.name}
        </PageHeaderHeading>
        <PageHeaderDescription>
          {propertyAddress({
            street: property.data?.street as string,
            city: property.data?.city as string,
            province: property.data?.province as string,
            country: property.data?.country as string,
          })}
        </PageHeaderDescription>
      </PageHeader>
    </div>
  );
};
