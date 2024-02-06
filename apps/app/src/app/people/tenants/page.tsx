import { NextPage } from "next";
import { CreateNewTenant } from "@/components/create-tenant/create-tenant";
import { PageSubheading } from "@/components/page-heading";
import { DeleteTenant } from "@/components/people/tenants/delete-tenant";
import { TenantDropdown } from "@/components/people/tenants/tenant-dropdown";
import { api } from "@/trpc/react";
import { cn } from "lib";
import { Search, User, User2 } from "lucide-react";
import {
  Badge,
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
} from "ui";

const Tenants: NextPage = () => {
  const tenants = api.tenant.getAll.useQuery();
  return (
    <div className="mt-6">
      <DeleteTenant />
      <div>
        <PageSubheading>Tenants({tenants.data?.length})</PageSubheading>
        <p>View and manage all the tenants in your business.</p>
      </div>

      <div className="mt-4 flex w-full flex-wrap items-center justify-between gap-2">
        <div className="mt-4 flex w-full items-center justify-between gap-x-4">
          <div className="relative w-96">
            <Search
              className="text-muted-foreground pointer-events-none absolute left-2 top-2.5 h-4 w-4"
              aria-hidden="true"
            />
            <Input
              placeholder="Search for a tenant."
              className="w-full pl-8 pr-2"
              type="search"
            />
          </div>
          <div className="flex w-full items-center justify-between gap-x-4 md:w-fit md:justify-start">
            <CreateNewTenant />
          </div>
        </div>
      </div>

      <div className="mt-6">
        {tenants.data?.length !== 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                {(
                  [
                    "Name",
                    "Phone number",
                    "Lease Status",
                    "Created At",
                    "Actions",
                  ] as const
                ).map((header) => (
                  <TableHead
                    key={header}
                    className={cn(
                      "bg-secondary text-secondary-foreground h-fit px-1 py-2 tracking-tight first:pl-4 last:pr-4",
                      header === "Actions" && "[&>*]:sr-only",
                    )}
                  >
                    <span>{header}</span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenants?.data?.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell className="w-1/3 py-4">
                    <div className="flex items-center gap-4">
                      <User
                        aria-hidden="true"
                        className="text-muted-foreground h-9 w-9 rounded-full border p-2"
                      />
                      <div className="flex flex-col gap-1">
                        <div className="line-clamp-1 font-medium tracking-tight">
                          {tenant.firstName} {tenant.lastName}
                        </div>
                        <div className="text-muted-foreground flex divide-x text-sm">
                          {tenant.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:[display:revert]">
                    {tenant.phone}
                  </TableCell>
                  <TableCell className="hidden md:[display:revert]">
                    <Badge variant="outline">No Active Lease(s)</Badge>
                  </TableCell>
                  <TableCell className="hidden md:[display:revert]">
                    {tenant.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <TenantDropdown
                      tenant={{
                        tenantId: tenant.id,
                        fullName: `${tenant.firstName} ${tenant.lastName}`,
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyState>
            <div className="mx-auto rounded-full border p-2">
              <User2
                className="text-muted-foreground h-5 w-5"
                aria-hidden="true"
              />
            </div>
            <EmptyStateTitle>No Tenants</EmptyStateTitle>
            <EmptyStateDescription>
              You don't have any tenants yet. Create one to get started.
            </EmptyStateDescription>
            <EmptyStateFooter>
              <CreateNewTenant />
            </EmptyStateFooter>
          </EmptyState>
        )}
      </div>
    </div>
  );
};

export default Tenants;
