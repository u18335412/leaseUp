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
import { Home, ListFilter, Plus, Search } from "lucide-react";
import {
  Badge,
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

      <div className="mt-6 flex items-center justify-between gap-x-4">
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
            <span className="sr-only md:not-sr-only">Create Property</span>
          </Link>
        </div>
      </div>

      <div className="mt-6">
        {properties.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                {(["Name", "Type", "Units", "Created", "Actions"] as const).map(
                  (header) => (
                    <TableHead
                      key={header}
                      className={cn({
                        "[&>*]:sr-only": header === "Actions",
                        "hidden md:[display:revert]":
                          header === "Type" ||
                          header === "Units" ||
                          header === "Created",
                      })}
                    >
                      <span>{header}</span>
                    </TableHead>
                  ),
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="w-3/4 py-5 md:w-2/4">
                    <div className="flex items-center gap-x-2">
                      <Badge
                        variant="outline"
                        className="hidden h-12 w-12 md:flex"
                      >
                        <Home
                          aria-hidden="true"
                          className="text-muted-foreground m-auto h-5 w-5"
                        />
                      </Badge>
                      <div className="flex flex-col gap-y-1">
                        <Link
                          href={`/properties/${property.id}/`}
                          className="font-medium line-clamp-1 tracking-tight"
                        >
                          {property.name}
                        </Link>
                        <div className="flex items-center gap-2">
                          {/* <MapPin
                            aria-hidden="true"
                            className="text-muted-foreground h-4 w-4 shrink-0"
                          /> */}
                          <span className="line-clamp-2 tracking-tight">
                            {property.street}, {property.city},{" "}
                            {property.province}, {property.country}.
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:[display:revert]">
                    <span className="capitalize">
                      {property.type.toString().toLocaleLowerCase()}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:[display:revert]">
                    {property.Unit.length}
                  </TableCell>
                  <TableCell className="hidden md:[display:revert]">
                    2 Months ago
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end md:justify-start">
                      <PropertyDropdown propertyId={property.id} />
                    </div>
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
