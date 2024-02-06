import dynamic from "next/dynamic";
import { CreateUnit } from "@/components/create-unit/create-unit-modal";
import { PageSubheading } from "@/components/page-heading";
import { DeleteUnitModal } from "@/components/properties/delete-unit-modal ";
import { UnitDropDown } from "@/components/properties/unit-dropdown";
import { api } from "@/trpc/react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { cn } from "lib";
import {
  ArrowUpDown,
  Bath,
  Bed,
  DoorOpen,
  Filter,
  Search,
  UserX,
} from "lucide-react";
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
  Label,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui";

// const DynamicCreateUnit = dynamic(() =>
//   import("@/components/create-unit/create-unit-modal").then(
//     (mod) => mod.CreateUnit,
//   ),
// );

const sortOptions = [
  "Unit Name Asc",
  "Unit Name Desc",
  "Status Asc",
  "Status Desc",
  "Rent Asc",
  "Rent Desc",
  "Deposit Asc",
  "Deposit Desc",
] as const;

export default function Units({ params }: { params: { id: string } }) {
  const units = api.property.getUnits.useQuery({
    propertyId: params.id,
  });

  return (
    <div>
      <div>
        <PageSubheading>Units({units.data?.length})</PageSubheading>
        <p>
          View and manage all the units for this property. You can also add new
          units.
        </p>
      </div>
      {units.data && units.data?.length > 0 ? (
        <>
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
                <DropdownMenuCheckboxes />
                <div>
                  <Label htmlFor="sort-by" className="sr-only">
                    Sort by
                  </Label>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <div className="flex items-center">
                        <ArrowUpDown
                          aria-hidden="true"
                          className="text-muted-foreground mr-2 h-4 w-4"
                        />
                        <SelectValue placeholder="Sort by" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {sortOptions.map((item) => (
                          <SelectItem value={item} key={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <CreateUnit />
              </div>
            </div>
          </div>
          <Table className="mt-4">
            <TableHeader className="bg-secondary text-secondary-foreground">
              <TableRow>
                {(
                  ["Unit", "Status", "Rent", "Deposit", "Actions"] as const
                ).map((header) => (
                  <TableHead
                    key={header}
                    className={cn(
                      {
                        "w-1/3": header === "Unit",
                        "[&>*]:sr-only": header === "Actions",
                        "hidden md:[display:revert]":
                          header === "Status" ||
                          header === "Rent" ||
                          header === "Deposit",
                      },
                      "h-fit px-1 py-2 tracking-tight first:pl-4 last:pr-4",
                    )}
                  >
                    <span>{header}</span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {units.data?.map((unit) => (
                <TableRow key={unit.name}>
                  <TableCell className="w-1/3 py-5 pl-4">
                    <div className="flex items-center gap-4">
                      <DoorOpen
                        aria-hidden="true"
                        className="text-muted-foreground h-9 w-9 rounded border p-2"
                      />
                      <div className="flex flex-col gap-1">
                        <div className="line-clamp-1 font-medium tracking-tight">
                          {unit.name}
                        </div>
                        <div className="text-muted-foreground flex divide-x text-sm">
                          <span className="flex items-center gap-2 pr-3.5">
                            <Bed
                              aria-hidden="true"
                              className="bg-primary/10 text-primary h-6 w-6 shrink-0 rounded-full p-1.5"
                            />
                            {unit.bedrooms}
                            <span className=" text-indigo-900">Bedrooms</span>
                          </span>
                          <span className="flex items-center gap-2 pl-3.5 font-medium">
                            <Bath
                              aria-hidden="true"
                              className="bg-primary/10 text-primary h-6 w-6 shrink-0 rounded-full p-1.5"
                            />
                            {unit.bathrooms}
                            <span className=" font-normal  text-indigo-900">
                              Bathrooms
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:[display:revert]">
                    <Badge
                      variant={unit.Lease.length > 0 ? "default" : "outline"}
                    >
                      {unit.Lease.length > 0 ? (
                        "Occupied"
                      ) : (
                        <span className="flex items-center gap-2">
                          <UserX
                            aria-hidden="true"
                            className="text-muted-foreground h-4 w-4"
                          />
                          Vacant
                        </span>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden italic tabular-nums md:[display:revert]">
                    <span className="w-full text-right">
                      ZAR {unit.rent.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell className="hidden italic tabular-nums md:[display:revert]">
                    <span>ZAR {unit.deposit.toFixed(2)}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end md:justify-start">
                      <UnitDropDown unit={unit} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              <DeleteUnitModal />
            </TableBody>
          </Table>
          <div className="mt-4 flex items-baseline justify-between">
            <p className="text-muted-foreground text-sm">
              Showing 1 to 5 of {units.data.length} results
            </p>
            <Pagination className="mx-0 w-fit">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      ) : (
        <EmptyState>
          <div>
            <DoorOpen
              aria-hidden="true"
              className="text-muted-foreground mx-auto h-10 w-10 rounded-full border p-2"
            />
          </div>
          <EmptyStateTitle>No Units</EmptyStateTitle>
          <EmptyStateDescription>
            There are no units for this property.
          </EmptyStateDescription>
          <EmptyStateFooter>
            <CreateUnit />
          </EmptyStateFooter>
        </EmptyState>
      )}
    </div>
  );
}

type Checked = DropdownMenuCheckboxItemProps["checked"];

function DropdownMenuCheckboxes() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Filter
            aria-hidden="true"
            className="text-muted-foreground mr-2 h-4 w-4"
          />
          Filters
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
