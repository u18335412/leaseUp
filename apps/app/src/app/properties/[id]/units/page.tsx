import { CreateUnit } from "@/components/create-unit/create-unit-modal";
import { PageSubheading } from "@/components/page-heading";
import { DeleteUnitModal } from "@/components/properties/delete-unit-modal ";
import { UnitDropDown } from "@/components/properties/unit-dropdown";
import { api } from "@/trpc/server";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { cn } from "lib";
import { Bath, Bed, ChevronDown, DoorOpen, Search, UserX } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
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

export default async function Units({ params }: { params: { id: string } }) {
  const units = await api.property.getUnits.query({
    propertyId: params.id,
  });

  return (
    <div>
      <div>
        <PageSubheading>Units({units.length})</PageSubheading>
        <p>
          View and manage all the units for this property. You can also add new
          units.
        </p>
      </div>
      {units.length > 0 ? (
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
                <CreateUnit />
              </div>
            </div>
          </div>
          <Card className="mt-4">
            <CardContent className="px-0 pb-0">
              <Table>
                <TableHeader>
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
                          "px-4 uppercase",
                        )}
                      >
                        <span>{header}</span>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {units.map((unit) => (
                    <>
                      <TableRow key={unit.name}>
                        <TableCell className="w-1/3 py-4 pl-4">
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
                                  <span className=" text-indigo-900">
                                    Bedrooms
                                  </span>
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
                            variant={
                              unit.Lease.length > 0 ? "default" : "outline"
                            }
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
                        <TableCell className="hidden md:[display:revert]">
                          <span className="w-full text-right font-semibold">
                            R {unit.rent}
                          </span>
                        </TableCell>
                        <TableCell className="hidden md:[display:revert]">
                          <span className="font-semibold">{unit.deposit}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end md:justify-start">
                            <UnitDropDown unit={unit} />
                          </div>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
                  <DeleteUnitModal />
                </TableBody>
              </Table>
            </CardContent>
          </Card>
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
