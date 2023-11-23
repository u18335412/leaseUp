import { api } from "@/trpc/server";
import { ChevronDown, Plus, Search, User } from "lucide-react";
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
} from "ui";

export default async function Tenants({ params }: { params: { id: string } }) {
  const tenants = await api.property.getTenants.query({
    propertyId: params.id,
  });

  return (
    <div>
      <div>
        <h2 className="text-lg font-bold tracking-tight">
          Tenants({tenants.length})
        </h2>
        <p className="text-muted-foreground">
          View and manage all the tenants for this property.
        </p>
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
            <div></div>
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
