import Link from "next/link";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-heading";
import { currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";
import { Home, DoorOpen, FileText, UserIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "ui";

const entities = [
  {
    name: "Property",
    description: "A property is a physical location that you own or manage.",
    icon: Home,
    href: "/properties/create-property",
  },
  {
    name: "Unit",
    icon: DoorOpen,
    description: "A unit is a physical space that you own or manage.",
    href: "/units",
  },
  {
    name: "Person",
    icon: UserIcon,
    description: "A person is a tenant, owner, or a potential tenant or owner.",
    href: "/people/tenants",
  },
  {
    name: "Lease",
    icon: FileText,
    description: "A lease is a contract between a person and a unit.",
    href: "/documents",
  },
];

export default async function Index() {
  const user: User | null = await currentUser();
  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>Dashboard</PageHeaderHeading>
        <PageHeaderDescription>
          Welcome back, {user?.firstName} !
        </PageHeaderDescription>
      </PageHeader>

      <div className=" mt-6">
        <p className="text-lg font-bold tracking-tight">
          Welcome to the leaseUp
        </p>
        <p className=" mt-2 max-w-5xl">
          leaseUp is a property management application that helps you manage
          your properties, tenants, and leases all in one place. Get started by
          creating a new property, unit, person, or lease.
        </p>
      </div>

      <div className="mt-6">
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {entities.map((entity, index) => (
            <Link href={entity.href} className="group">
              <Card
                key={index}
                className="group-hover:bg-primary text-white transition-colors"
              >
                <CardHeader>
                  <entity.icon
                    className="text-muted-foreground h-5 w-5 group-hover:text-white"
                    aria-hidden="true"
                  />
                </CardHeader>
                <CardContent>
                  <div>
                    <h3 className="font-semibold tracking-tight text-black group-hover:text-white">
                      {entity.name}
                    </h3>
                    <p className="text-sm text-gray-500 group-hover:text-white">
                      {entity.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
