import { FC } from "react";
import Link from "next/link";
import { api } from "@/trpc/react";
import { Plus, User } from "lucide-react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Separator,
  buttonVariants,
} from "ui";

export const AddNewTenantDialog: FC = () => {
  const tenantQuery = api.lease.getAllTenants.useQuery();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="secondary">
          <Plus aria-hidden="true" className="mr-2 h-4 w-4" />
          Add new tenant
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add tenant to lease.</DialogTitle>
          <DialogDescription>
            Add an existing tenant or create a new one to add to this lease.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between gap-x-2">
          <div className="w-full max-w-[16rem]">
            <Label htmlFor="search-tenant" className="sr-only w-full">
              Search for tenant
            </Label>
            <Input placeholder="Search for tenant" />
          </div>
          <div className="flex-shrink-0">
            <Link
              className={buttonVariants({
                variant: "outline",
              })}
              href="/people/tenants"
            >
              Create new tenant
            </Link>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-muted-foreground text-sm">Recent tenants</h2>
          <ol className="mt-2 divide-y">
            {tenantQuery.data?.data?.map((tenant) => (
              <li
                key={tenant.id}
                className="flex items-center justify-between gap-x-2 py-4"
              >
                <div>
                  <div className="flex items-center gap-x-2">
                    <User
                      aria-hidden="true"
                      className="text-muted-foreground h-9 w-9 rounded-full border p-2"
                    />
                    <div>
                      <h3 className="text-sm">
                        {tenant.firstName} {tenant.firstName}
                      </h3>
                      <p className="text-muted-foreground flex items-center gap-x-1 text-sm">
                        {tenant.email}
                        <Separator className="h-1.5 w-1.5 rounded-full" />
                        {tenant.phone}
                      </p>
                    </div>
                  </div>
                </div>
                <Button size="sm">Add Tenant</Button>
              </li>
            ))}
          </ol>
        </div>
      </DialogContent>
    </Dialog>
  );
};
