import { FC } from "react";
import { CreateNewTenant } from "@/components/create-tenant/create-tenant";
import { Search } from "lucide-react";
import { Input } from "ui";

export const Tenants: FC = () => {
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
              placeholder="Search for a unit."
              className="w-full pl-8 pr-2"
              type="search"
            />
          </div>
          <div className="flex w-full items-center justify-between gap-x-4 md:w-fit md:justify-start">
            <CreateNewTenant />
          </div>
        </div>
      </div>
    </div>
  );
};
