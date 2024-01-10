"use client";

import type { NextPage } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Archive, ArrowRight, DoorOpen, FileText, User2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "ui";

const mockData = [
  {
    label: "Total Units",
    value: "8",
    icon: DoorOpen,
    link: "/units",
  },
  {
    label: "Total Tenants",
    value: "4",
    icon: User2,
    link: "/tenants",
  },
  {
    label: "Total Leases",
    value: "4",
    icon: FileText,
    link: "/leases",
  },
  {
    label: "Total Documents",
    value: "10",
    icon: Archive,
    link: "/documents",
  },
] as const;

const ViewProperty: NextPage = () => {
  const path = usePathname();
  return (
    <div className="mt-6">
      <div>
        <h2 className="text-lg font-bold tracking-tight">Overview</h2>
        <p>View important number and details for this property.</p>
      </div>

      <div className="mt-8 flex max-w-5xl items-center gap-8">
        {mockData.map((item) => (
          <Card className="w-fit flex-1 border-none">
            <CardHeader className="items-center justify-between gap-4 space-y-0 md:flex-row">
              <div className="flex flex-col gap-2">
                <CardTitle className="text-xl font-extrabold">
                  {item.value}
                </CardTitle>
                <CardDescription>{item.label}</CardDescription>
              </div>
              <span className="border-primary/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border shadow">
                <item.icon className="text-primary h-4 w-4" />
              </span>
            </CardHeader>
            <CardContent className="-mt-2">
              <Link
                href={path + item.link}
                className="group flex items-center text-sm underline"
              >
                View {item.label.split(" ")[1]}
                <ArrowRight className="text-muted-foreground group ml-2 h-4 w-4 shrink-0 transition-all group-hover:translate-x-1" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ViewProperty;
