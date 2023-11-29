import { FC } from "react";
import { CreateNewTenant } from "@/components/create-tenant/create-tenant";
import { api } from "@/trpc/server";
import { cn } from "lib";
import { MoreVertical, Search, User2 } from "lucide-react";
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
  buttonVariants,
} from "ui";

export const Tenants: FC = async () => {
  const tenantsQuery = await api.tenant.getAll.query();
  return (
    <div className="mt-6">
      <div>
        <h2 className="text-lg font-bold">Tenants</h2>
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
        {tenantsQuery.length !== 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                {(
                  ["Name", "Phone", "Email", "Created", "Actions"] as const
                ).map((header) => (
                  <TableHead
                    key={header}
                    className={cn(
                      {
                        "w-1/3": header === "Name",
                        "[&>*]:sr-only": header === "Actions",
                        "hidden md:[display:revert]":
                          header === "Phone" ||
                          header === "Created" ||
                          header === "Email",
                      },
                      "",
                    )}
                  >
                    <span>{header}</span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenantsQuery.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell className="w-1/3 py-4">
                    <div className="flex items-center gap-4">
                      <Badge
                        aria-hidden="true"
                        variant="outline"
                        className="hidden h-12 w-12 rounded-full md:flex"
                      >
                        <User2
                          aria-hidden="true"
                          className="text-muted-foreground m-auto h-5 w-5"
                        />
                      </Badge>
                      <div className="flex flex-col gap-2">
                        <div className="line-clamp-1 font-medium tracking-tight">
                          {tenant.firstName} {tenant.lastName}
                        </div>
                        <a
                          href={`mailto:${tenant.email}`}
                          className=" underline md:hidden"
                        >
                          {tenant.email}
                        </a>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:[display:revert]">
                    {tenant.phone}
                  </TableCell>
                  <TableCell className="hidden md:[display:revert]">
                    <a
                      href={`mailto:${tenant.email}`}
                      className={buttonVariants({
                        variant: "link",
                      })}
                    >
                      {tenant.email}
                    </a>
                  </TableCell>
                  <TableCell className="hidden md:[display:revert]">
                    <span className="font-semibold">
                      {tenant.createdAt.toISOString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end md:justify-start">
                      <button>
                        <span className="sr-only">Actions</span>
                        <MoreVertical
                          aria-hidden="true"
                          className="text-muted-foreground h-5 w-5"
                        />
                      </button>
                    </div>
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
