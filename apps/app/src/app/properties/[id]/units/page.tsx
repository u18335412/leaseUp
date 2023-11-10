import { CreateUnit } from "@/components/create-unit/create-unit-modal";
import { api } from "@/trpc/server";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { cn } from "lib";
import { Bath, Bed, ChevronDown, DoorOpen, Search } from "lucide-react";
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui";

export default async function Units({ params }: { params: { id: string } }) {
  const property = await api.property.getById.query({
    propertyId: params.id,
  });

  return (
    <div>
      <div className="mt-4 flex w-full flex-wrap items-center justify-between gap-2">
        <div className="relative w-96">
          <Search
            className="text-muted-foreground pointer-events-none absolute left-2 top-2.5 h-4 w-4"
            aria-hidden="true"
          />
          <Input
            placeholder="Search for a unit..."
            className="w-full pl-8 pr-2"
            type="search"
          />
        </div>
        <div className="flex w-full items-center justify-between gap-x-4 md:w-fit md:justify-start">
          <DropdownMenuCheckboxes />
          <CreateUnit />
        </div>
      </div>
      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              {(["Unit", "Status", "Rent", "Deposit", "Actions"] as const).map(
                (header) => (
                  <TableHead
                    key={header}
                    className={cn(
                      {
                        "w-1/3": header === "Unit",
                        "[&>*]:sr-only": header === "Actions",
                      },
                      "",
                    )}
                  >
                    <span>{header}</span>
                  </TableHead>
                ),
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {property.Unit.map((unit) => (
              <TableRow key={unit.name}>
                <TableCell className="w-1/3 py-4">
                  <div className="flex items-center gap-4">
                    <span className="grid place-content-center rounded-md border p-2 md:h-12 md:w-12">
                      <DoorOpen className="text-muted-foreground h-5 w-5 shrink-0" />
                    </span>
                    <div className="flex flex-col gap-2">
                      <div className="font-medium tracking-tight">
                        {unit.name}
                      </div>
                      <div className="text-muted-foreground flex gap-4 text-sm">
                        <span className="flex items-center gap-2 font-medium">
                          {unit.bedrooms}
                          <Bed className="h-4 w-4 shrink-0" />
                          <span className="">Bedrooms</span>
                        </span>
                        <span className="flex items-center gap-2 font-medium">
                          {unit.bathrooms}
                          <Bath className="h-4 w-4 shrink-0" />
                          <span className="">Bathrooms</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={unit.Lease.length > 0 ? "default" : "destructive"}
                    className="bg-opacity-10"
                  >
                    {unit.Lease.length > 0 ? "Occupied" : "Vacant"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="w-full text-right font-semibold">
                    R {unit.rent}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-semibold">{unit.deposit}</span>
                </TableCell>
                <TableCell>
                  <Button variant="secondary" size="sm">
                    Actions
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

type Checked = DropdownMenuCheckboxItemProps["checked"];

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
