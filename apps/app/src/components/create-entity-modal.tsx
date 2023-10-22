import { Plus, DoorOpen, FileText, Home, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, type FC } from "react";
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
    href: "/properties/create-property",
  },
  {
    name: "Unit",
    icon: DoorOpen,
    description: "A unit is a physical space that you own or manage.",
    href: "/units",
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
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex w-full gap-x-2">
          <Plus className="h-4 w-4 shrink-0" />
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
              className="h-full text-left"
              key={entity.name}
              onClick={() => {
                closeButtonRef.current?.click();
                router.push(entity.href);
              }}
              type="button"
            >
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center">
                  <div>
                    <CardTitle>{entity.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {entity.description}
                    </CardDescription>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-content-center rounded-full bg-primary/10 ">
                    <entity.icon
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-primary"
                    />
                  </span>
                </CardHeader>
              </Card>
            </button>
          ))}
        </div>

        <DialogFooter>
          <DialogDismiss asChild ref={closeButtonRef}>
            <Button variant="secondary">Cancel</Button>
          </DialogDismiss>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
