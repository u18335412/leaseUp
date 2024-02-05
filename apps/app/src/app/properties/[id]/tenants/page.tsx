import { PageSubheading } from "@/components/page-heading";
import { api } from "@/trpc/server";
import { ChevronDown, MoreVertical, Plus, Search, User } from "lucide-react";
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
} from "ui";

export default async function Tenants({ params }: { params: { id: string } }) {
  const tenants = await api.property.getTenants.query({
    propertyId: params.id,
  });

  return (
    <div>
      <div>
        <PageSubheading>Tenants({tenants.length})</PageSubheading>
        <p>View and manage all the tenants for this property.</p>
      </div>
      {tenants.length > 0 ? (
        <>
          <div className="mt-4 flex items-center justify-between">
            <div className="relative w-96">
              <Search
                className="text-muted-foreground pointer-events-none absolute left-2 top-2.5 h-4 w-4"
                aria-hidden="true"
              />
              <Input
                placeholder="Search for a tenant..."
                className="w-full pl-8 pr-2"
                type="search"
              />
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenuCheckboxes />
              <Button>
                <Plus aria-hidden="true" className="mr-2 h-4 w-4" />
                Add Tenant
              </Button>
            </div>
          </div>
          <div>
            <div className="mt-4">
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
                        className="bg-secondary text-secondary-foreground h-fit px-1 py-2 tracking-tight first:pl-4 last:pr-4"
                      >
                        <span>{header}</span>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tenants.map((tenant) => (
                    <>
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
                          <span className="font-medium">
                            {tenant.createdAt.toLocaleDateString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end md:justify-start">
                            <button>
                              <MoreVertical
                                className="text-muted-foreground h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      ) : (
        <EmptyState>
          <div>
            <User
              aria-hidden="true"
              className="text-muted-foreground mx-auto h-10 w-10 rounded-full border p-2"
            />
          </div>
          <EmptyStateTitle>No Tenants</EmptyStateTitle>
          <EmptyStateDescription>
            There are no tenants for this property.
          </EmptyStateDescription>
          <EmptyStateFooter>
            <Button>
              <Plus aria-hidden="true" className="mr-2 h-4 w-4" />
              Add Tenant
            </Button>
          </EmptyStateFooter>
        </EmptyState>
      )}
    </div>
  );
}

function DropdownMenuCheckboxes() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Filters
          <ChevronDown
            aria-hidden="true"
            className="text-muted-foreground ml-2 h-4 w-4"
          />
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
