"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DoorOpen, KanbanSquare, User2, Users, File } from "lucide-react";
import { ScrollArea, Tabs, TabsList, TabsTrigger } from "ui";

const tabs = [
  {
    name: "Overview",
    icon: KanbanSquare,
    routeName: "",
  },
  {
    name: "Units",
    icon: DoorOpen,
    routeName: "units",
  },
  {
    name: "Tenants",
    icon: User2,
    routeName: "tenants",
  },
  {
    name: "Owners",
    icon: Users,
    routeName: "owners",
  },
  {
    name: "Documents",
    icon: File,
    routeName: "documents",
  },
];

export const ClientTabs = ({ id }: { id: string }) => {
  const path = usePathname();
  const currentTab = path.split("/")[3]?.toLocaleLowerCase();
  return (
    <Tabs defaultValue={currentTab ? currentTab : "overview"}>
      <ScrollArea>
        <TabsList className="mt-6">
          {tabs.map((item) => (
            <TabsTrigger
              key={item.name}
              value={item.name.toLowerCase()}
              asChild
            >
              <Link href={`/properties/${id}/${item.routeName}`}>
                <item.icon
                  className="text-muted-foreground mr-2 h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
                <span>{item.name}</span>
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </ScrollArea>
    </Tabs>
  );
};
