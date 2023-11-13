/* eslint-disable @typescript-eslint/require-await -- Expected this a a server component */
import type { NextPage } from "next";
import Link from "next/link";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-heading";
import { PropertyDropdown } from "@/components/properties/propertyDropdown";
import { api } from "@/trpc/server";
import { cn } from "lib";
import {
  ChevronDown,
  Home,
  ListFilter,
  MapPin,
  MoreVertical,
  Plus,
  Search,
} from "lucide-react";
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EmptyState,
  EmptyStateDescription,
  EmptyStateFooter,
  EmptyStateTitle,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  buttonVariants,
} from "ui";

const Properties: NextPage = async () => {
  const properties = await api.property.getAll.query();

  return (
    <div>
      <PageHeader>
        <div>
          <PageHeaderHeading>Properties</PageHeaderHeading>
          <PageHeaderDescription>
            Properties are the physical locations that you rent out to tenants.
          </PageHeaderDescription>
        </div>
      </PageHeader>

      <div className="mt-6 flex items-center justify-between">
        <div className="relative w-96">
          <Search
            className="text-muted-foreground pointer-events-none absolute left-2 top-2.5 h-4 w-4"
            aria-hidden="true"
          />
          <Input
            placeholder="Search for a property"
            className="w-full pl-8 pr-2"
            type="search"
          />
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenuCheckboxes />
          <Link
            className={cn(buttonVariants(), "flex items-center gap-x-2")}
            href="/properties/create-property"
          >
            <Plus aria-hidden="true" className="h-4 w-4" />
            Create Property
          </Link>
        </div>
      </div>

      <div className="mt-6">
        {properties.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                {["Name", "Type", "Units", "Created", "Actions"].map(
                  (header) => (
                    <TableHead key={header}>{header}</TableHead>
                  ),
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="w-2/4 py-5">
                    <div className="flex items-center gap-x-2">
                      <Home
                        aria-hidden="true"
                        className="text-muted-foreground h-full w-10 rounded border p-2.5"
                      />
                      <div className="flex flex-col gap-y-1">
                        <Link
                          href={`/properties/${property.id}/`}
                          className="font-medium"
                        >
                          {property.name}
                        </Link>
                        <div className="flex items-center gap-2 font-light">
                          {/* <MapPin
                            aria-hidden="true"
                            className="text-muted-foreground h-4 w-4 shrink-0"
                          /> */}
                          <span>
                            {property.street}, {property.city},{" "}
                            {property.province}, {property.country}.
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="capitalize">
                      {property.type.toString().toLocaleLowerCase()}
                    </span>
                  </TableCell>
                  <TableCell>{property.Unit.length}</TableCell>
                  <TableCell>2 Months ago</TableCell>
                  <TableCell>
                    <PropertyDropdown propertyId={property.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyState>
            <div className="flex justify-center">
              <span className="rounded-full border-2 p-2">
                <Home aria-hidden="true" className="h-5 w-5 text-gray-400" />
              </span>
            </div>
            <EmptyStateTitle>No Properties</EmptyStateTitle>
            <EmptyStateDescription>
              You haven&apos;t created any properties yet.
            </EmptyStateDescription>
            <EmptyStateFooter>
              <Link
                className={cn(buttonVariants(), "flex items-center gap-x-2")}
                href="/properties/create-property"
              >
                <Plus aria-hidden="true" className="h-4 w-4" />
                Create Property
              </Link>
            </EmptyStateFooter>
          </EmptyState>
        )}
      </div>
    </div>
  );
};

export default Properties;

function DropdownMenuCheckboxes() {
  "use client";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <ListFilter
            aria-hidden="true"
            className="text-muted-foreground mr-2 h-4 w-4"
          />
          Filters
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem>Vacant</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Occupied</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
