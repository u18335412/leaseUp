"use client";

/* eslint-disable @typescript-eslint/no-non-null-assertion -- allow null assertion */
import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreateEntityModal } from "./create-entity-modal";
import { UserButton } from "@clerk/nextjs";
import { cn } from "lib";
import {
  LayoutDashboard,
  Home,
  FileText,
  Users2,
  Files,
  Archive,
  Search,
  MessageSquarePlus,
  Info,
} from "lucide-react";
import logoImage from "public/logo.png";
import {
  Button,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Separator,
} from "ui";

const navigation = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    name: "Properties",
    icon: Home,
    href: "/properties",
  },
  {
    name: "Leases",
    icon: FileText,
    href: "/leases",
  },
  {
    name: "People",
    icon: Users2,
    href: "/people",
  },
  {
    name: "Documents",
    icon: Archive,
    href: "/documents",
  },
  {
    name: "Reports",
    icon: Files,
    href: "/reports",
  },
];

const isCurrentUrl = (href: string, path: string) => {
  if (href !== "/") return path.startsWith(href);
  return path === href;
};

export function Layout({ children }: { children: ReactNode }): JSX.Element {
  const path = usePathname();
  const [openCommand, setOpenCommand] = useState<boolean>(false);
  return (
    <div className="antialiased">
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/">
              <Image alt="" height={100} src={logoImage} width={100} />
            </Link>
          </div>
          <div className="w-full">
            <CreateEntityModal />
          </div>
          <nav className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col gap-y-7">
              <div>
                <ul className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        className={cn(
                          "group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                          {
                            "bg-muted/50 text-primary font-bold": isCurrentUrl(
                              item.href,
                              path!,
                            ),
                            "hover:text-primary text-gray-700 transition-all hover:bg-gray-50":
                              !isCurrentUrl(item.href, path!),
                          },
                        )}
                        href={item.href}
                      >
                        <item.icon
                          aria-hidden="true"
                          className={cn("h-4 w-4 shrink-0", {
                            "text-primary": isCurrentUrl(item.href, path!),
                            "text-gray-400 group-hover:text-indigo-600":
                              !isCurrentUrl(item.href, path!),
                          })}
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
          <Separator />
          <div className="flex flex-col gap-y-4 text-sm">
            <span className="flex items-center gap-x-2">
              <Info
                aria-hidden="true"
                className="text-muted-foreground h-4 w-4"
              />
              Help Center
            </span>
            <span className="flex items-center gap-x-2">
              <MessageSquarePlus
                aria-hidden="true"
                className="text-muted-foreground h-4 w-4"
              />
              Provide Feedback
            </span>
          </div>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white md:hidden">
        <ul className="text-primary flex w-full justify-between bg-white px-4 py-2">
          {navigation.map((item) => (
            <li key={item.name} className="transition-all">
              <Link
                className="flex flex-col items-center justify-center"
                href={item.href}
              >
                <span className="bg-primary/10 rounded-full border p-2">
                  <item.icon
                    aria-hidden="true"
                    className="text-primary h-4 w-4"
                  />
                </span>
                <span
                  className={cn("text-xs font-semibold transition-all", {
                    "sr-only": !isCurrentUrl(item.href, path!),
                  })}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="bg-gray-100 h-full lg:pl-72">
        <div className="z-40 lg:mx-auto lg:max-w-7xl">
          <div className="flex h-16 items-center gap-x-4 sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none ">
            <div className="flex flex-1 items-center gap-x-2 self-stretch bg-white px-4 py-2 sm:px-6 lg:px-8">
              <div className="relative flex flex-1">
                <label className="sr-only" htmlFor="search-field">
                  Search
                </label>
                <div>
                  <Button
                    onClick={() => {
                      setOpenCommand(true);
                    }}
                    variant="outline"
                    className="flex items-center px-2 text-left"
                  >
                    <Search
                      aria-hidden="true"
                      className="pointer-events-none mr-2 h-full w-4 shrink-0 text-gray-400"
                    />
                    <span className="line-clamp-1">
                      Search for property, lease, document etc
                    </span>
                  </Button>
                </div>
                <CommandDialog
                  onOpenChange={(value) => {
                    setOpenCommand(value);
                  }}
                  open={openCommand}
                >
                  <CommandInput placeholder="Type a command or search..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                      <CommandItem>Calendar</CommandItem>
                      <CommandItem>Search Emoji</CommandItem>
                      <CommandItem>Calculator</CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                      <CommandItem>Profile</CommandItem>
                      <CommandItem>Billing</CommandItem>
                      <CommandItem>Settings</CommandItem>
                    </CommandGroup>
                  </CommandList>
                </CommandDialog>
              </div>
              <div className="flex items-center">
                <UserButton />
              </div>
            </div>
          </div>
        </div>

        <main className="h-full bg-gray-100">
          <div className="mx-auto min-h-screen h-full max-w-7xl rounded-b-lg bg-white px-4 pb-20 sm:px-6 lg:px-8 lg:pb-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
