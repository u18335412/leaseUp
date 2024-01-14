"use client";

import { FC, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Unit } from "@prisma/client";
import { MoreVertical, Pencil, PowerOff, Trash, View } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "ui";

export const UnitDropDown: FC<{
  unit: Pick<Unit, "id" | "name" | "propertyId">;
}> = ({ unit }) => {
  const router = useRouter();
  const UnitDropdownItems = useMemo(
    () =>
      [
        {
          label: "View",
          icon: View,
          onClick: (unitId: string) => {},
        },
        {
          label: "Edit",
          icon: Pencil,
          onClick: (unitId: string) => {
            router.push(`/properties/${unit.propertyId}/units?unit=${unitId}`);
          },
        },
        {
          label: "Disable Unit",
          icon: PowerOff,
          onClick: (unitId: string) => {
            router.push(`/properties/${unit.propertyId}/units?unit=${unitId}`);
          },
        },
        {
          label: "Delete",
          icon: Trash,
          onClick: (unitId: string) => {
            router.push(
              `/properties/${unit.propertyId}/units?unit=${unitId}&modal=delete&name=${unit.name}`,
            );
          },
        },
      ] as const,
    [],
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <span className="sr-only">Actions</span>
          <MoreVertical
            aria-hidden="true"
            className="text-muted-foreground h-5 w-5"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {UnitDropdownItems.map((item) => (
          <DropdownMenuItem
            key={item.label}
            onClick={() => {
              item.onClick(unit.id);
            }}
          >
            <div className="flex cursor-pointer items-center gap-x-2">
              <item.icon
                aria-hidden="true"
                className="text-muted-foreground h-4 w-4"
              />
              {item.label}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
