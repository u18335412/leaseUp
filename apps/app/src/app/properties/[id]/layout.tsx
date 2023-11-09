"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-heading";
import {
  KanbanSquare,
  DoorOpen,
  User2,
  Users,
  File,
} from "lucide-react";
import { ScrollArea, Tabs, TabsList, TabsTrigger } from "ui";

const tabs = [
  {
    name: "Overview",
    icon: KanbanSquare,
    link: "/properties/was/",
  },
  {
    name: "Units",
    icon: DoorOpen,
    link: "/properties/was/units",
  },
  {
    name: "Tenants",
    icon: User2,
    link: "/properties/was/tenants",
  },
  {
    name: "Owners",
    icon: Users,
    link: "/properties/was/owners",
  },
  {
    name: "Documents",
    icon: File,
    link: "/properties/was/documents",
  },
];

const Layout = ({ children }) => {
  const path = usePathname();
  const currentTab = path.split("/")[3]?.toLocaleLowerCase();
  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>
          6692 Transient street, Devland, Soweto
        </PageHeaderHeading>
        <PageHeaderDescription>
          Property at devland transient street.
        </PageHeaderDescription>
      </PageHeader>

      <Tabs defaultValue={currentTab ? currentTab : "overview"}>
        <ScrollArea className="mt-6 w-screen">
          <TabsList>
            {tabs.map((item) => (
              <TabsTrigger
                key={item.name}
                value={item.name.toLowerCase()}
                asChild
              >
                <Link href={item.link}>
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

      <div className="mt-6">{children}</div>
    </div>
  );
};

export default Layout;
