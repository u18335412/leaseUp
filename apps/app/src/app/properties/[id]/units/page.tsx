import { cn } from "lib";
import { Bath, Bed } from "lucide-react";
import {
  Badge,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui";

const units = [
  {
    name: "Upstairs Unit 1",
    status: "Vacant",
    rent: "R3,200",
    deposit: "R3,200",
    bedrooms: 1,
    bathrooms: 1,
  },
  {
    name: "Upstairs Unit 2",
    status: "Occupied",
    rent: "R3,500",
    deposit: "R3,200",
    bedrooms: 1,
    bathrooms: 1,
  },
  {
    name: "Upstairs Unit 3",
    status: "Vacant",
    rent: "R3,200",
    deposit: "R3,200",
    bedrooms: 1,
    bathrooms: 1,
  },
];

export default async function Units() {
  return (
    <div>
      <div className="mt-4">
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  {(
                    ["Unit", "Status", "Rent", "Deposit", "Actions"] as const
                  ).map((header) => (
                    <TableHead
                      key={header}
                      className={cn({
                        "w-1/3": header === "Unit",
                        "[&>*]:sr-only": header === "Actions",
                      })}
                    >
                      <span>{header}</span>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {units.map((unit) => (
                  <TableRow key={unit.name}>
                    <TableCell className="w-1/3">
                      <div className="flex flex-col gap-2">
                        <div className="text-base font-medium tracking-tight">
                          {unit.name}
                        </div>
                        <div className="text-muted-foreground flex gap-4 text-sm">
                          <span className="flex items-center gap-2 font-medium">
                            {unit.bedrooms} <Bed className="h-5 w-5 shrink-0" />
                            <span className="">Bedroom</span>
                          </span>
                          <span className="flex items-center gap-2 font-medium">
                            {unit.bathrooms}{" "}
                            <Bath className="h-5 w-5 shrink-0" />
                            <span className="">Bathrooms</span>
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          unit.status === "Vacant" ? "destructive" : "outline"
                        }
                      >
                        {unit.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span>{unit.rent}</span>
                    </TableCell>
                    <TableCell>
                      <span>{unit.deposit}</span>
                    </TableCell>
                    <TableCell>
                      <span>Actions</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
