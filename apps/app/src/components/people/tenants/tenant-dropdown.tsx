"use client";

import { FC } from "react";
import Link from "next/link";
import { Edit, Eye, MoreVertical, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "ui";

const DropdownActions = [
  {
    name: "View",
    icon: Eye,
    href: () => "/people/tenants/view-tenant",
  },
  {
    name: "Edit",
    icon: Edit,
    href: () => "/people/tenants/edit-tenant",
  },
  {
    name: "Delete",
    icon: Trash,
    href: (tenantId: string, fullName: string) =>
      `/people/tenants/?modal=deleteTenant&tenantId=${tenantId}&fullName=${fullName}`,
  },
] as const;

export const TenantDropdown: FC<{
  tenant: {
    tenantId: string;
    fullName: string;
  };
}> = ({ tenant: { fullName, tenantId } }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center md:justify-center">
          <button>
            <MoreVertical
              className="text-muted-foreground h-5 w-5"
              aria-hidden="true"
            />
          </button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {DropdownActions.map((action, index) => (
          <DropdownMenuItem key={index} className="cursor-pointer" asChild>
            <Link
              href={
                action.name === "Delete"
                  ? action.href(tenantId, fullName)
                  : action.href()
              }
              className="flex items-center"
            >
              <action.icon
                className="text-muted-foreground mr-2 h-4 w-4"
                aria-hidden="true"
              />
              {action.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
