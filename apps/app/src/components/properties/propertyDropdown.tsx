import { FC } from "react";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Button,
} from "ui";

export const PropertyDropdown: FC<{
  propertyId: string;
}> = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <MoreVertical aria-hidden="true" className="h-4 w-4" />
          <span className="sr-only">Actions</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>View</DropdownMenuItem>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
