import { Plus, DoorOpen, FileText, Home, User } from "lucide-react";
import type { FC } from "react";
import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogDismiss,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "ui";

const entities = [
  {
    name: "Property",
    description: "A property is a physical location that you own or manage.",
    icon: Home,
    href: "/",
  },
  {
    name: "Unit",
    icon: DoorOpen,
    description: "A unit is a physical space that you own or manage.",
    href: "/properties",
  },
  {
    name: "Person",
    icon: User,
    description: "A person is a tenant, owner, or a potential tenant or owner.",
    href: "/people",
  },
  {
    name: "Lease",
    icon: FileText,
    description: "A lease is a contract between a person and a unit.",
    href: "/documents",
  },
];

export const CreateEntityModal: FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full flex gap-x-2">
          <Plus className="w-4 h-4 shrink-0" />
          Create Entity
        </Button>
      </DialogTrigger>
      <DialogContent className=" max-w-xl">
        <DialogHeader>
          <DialogTitle>Create Something New</DialogTitle>
          <DialogDescription>
            Please select the type of entity you would like to create.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          {entities.map((entity) => (
            <button
              className="text-left h-full"
              key={entity.name}
              type="button"
            >
              <Card className=" h-full">
                <CardHeader>
                  <entity.icon className="w-5 h-5 text-primary shrink-0 mb-2" />
                  <CardTitle>{entity.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {entity.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </button>
          ))}
        </div>

        <DialogFooter>
          <DialogDismiss asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogDismiss>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
