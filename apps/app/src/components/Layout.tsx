/* eslint-disable @typescript-eslint/no-non-null-assertion -- allow null assertion */
'use client';

import { UserButton } from '@clerk/nextjs';
import { Dialog, DialogContent, DialogTrigger, Input } from 'ui';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  LayoutDashboard,
  Home,
  DoorClosed,
  Users2,
  Files,
  Archive,
  Search,
  MenuSquare,
} from 'lucide-react';
import { cn } from 'lib';
import { usePathname } from 'next/navigation';
import logoImage from 'public/logo.png';

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { name: 'Properties', icon: Home, href: '/properties' },
  { name: 'Units', icon: DoorClosed, href: '/units' },
  { name: 'People', icon: Users2, href: '/people' },
  { name: 'Documents', icon: Archive, href: '/documents' },
  { name: 'Reports', icon: Files, href: '/reports' },
];

const isCurrentUrl = (href: string, path: string) => href === path;

export default function Layout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const path = usePathname();
  return (
    <div>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/">
              <Image alt="" height={100} src={logoImage} width={100} />
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        className={cn(
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold items-center',
                          {
                            'bg-muted/50 text-primary font-bold': isCurrentUrl(
                              item.href,
                              path!,
                            ),
                            'text-gray-700 hover:text-primary hover:bg-gray-50 transition-all':
                              !isCurrentUrl(item.href, path!),
                          },
                        )}
                        href={item.href}
                      >
                        <item.icon
                          aria-hidden="true"
                          className={cn('h-4 w-4 shrink-0', {
                            'text-primary': isCurrentUrl(item.href, path!),
                            'text-gray-400 group-hover:text-indigo-600':
                              !isCurrentUrl(item.href, path!),
                          })}
                        />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="lg:pl-72 bg-gray-100">
        <div className=" z-40 lg:mx-auto lg:max-w-7xl">
          <div className="flex h-16 items-center gap-x-4 px-4 sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none ">
            <div className="md:hidden">
              <Dialog>
                <DialogTrigger asChild>
                  <span className="h-full text-gray-500 mt-2">
                    <MenuSquare aria-hidden="true" className="w-7 h-7" />
                    <span className="sr-only">Menu</span>
                  </span>
                </DialogTrigger>
                <DialogContent className="p-0 translate-y-0 top-0">
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <p className="font-semibold border border-border py-0.5 px-1.5 text-sm bg-primary text-primary-foreground">
                        LeaseUp
                      </p>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  className={cn(
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium items-center',
                                    {
                                      'bg-muted/50 text-primary font-bold':
                                        isCurrentUrl(item.href, path!),
                                      'text-gray-700 hover:text-primary hover:bg-gray-50 transition-all':
                                        !isCurrentUrl(item.href, path!),
                                    },
                                  )}
                                  href={item.href}
                                >
                                  <item.icon
                                    aria-hidden="true"
                                    className={cn('h-4 w-4 shrink-0', {
                                      'text-primary': isCurrentUrl(
                                        item.href,
                                        path!,
                                      ),
                                      'text-gray-400 group-hover:text-indigo-600':
                                        !isCurrentUrl(item.href, path!),
                                    })}
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex rounded-t-lg mt-4 bg-white flex-1 self-stretch">
              <form action="#" className="relative flex flex-1" method="GET">
                <label className="sr-only" htmlFor="search-field">
                  Search
                </label>
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-4 h-full w-4 text-gray-400"
                />
                <Input
                  className="block h-full w-full max-w-xl border-none py-0 pr-2 pl-10 text-gray-900 shadow-none placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Search for anything"
                  type="search"
                />
              </form>
              <div className="flex items-center pr-4">
                <UserButton />
              </div>
            </div>
          </div>
        </div>

        <main className="bg-gray-100 min-h-screen">
          <div className="mx-auto max-w-7xl rounded-b-lg px-4 sm:px-6 pb-4 lg:pb-8 lg:px-8 bg-white">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
