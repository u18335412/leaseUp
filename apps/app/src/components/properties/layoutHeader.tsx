import {
  PageHeaderHeading,
  PageHeaderDescription,
  PageHeader,
} from "../page-heading";
import { ClientTabs } from "./clientLayoutTabs";
import { api } from "@/trpc/server";

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

export const LayoutHeader = async ({ id }: { id: string }) => {
  const property = await api.property.getById.query({
    propertyId: id,
  });
  return (
    <PageHeader>
      <PageHeaderHeading>{property?.name}</PageHeaderHeading>
      <PageHeaderDescription>
        {propertyAddress({
          street: property?.street as string,
          city: property?.city as string,
          province: property?.province as string,
          country: property?.country as string,
        })}
      </PageHeaderDescription>

    </PageHeader>
  );
};
