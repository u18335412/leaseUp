'use client';

import { UserButton } from '@clerk/nextjs';
import { Dialog, DialogContent, DialogTrigger, Input } from 'ui';
import { ReactNode } from 'react';
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

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { name: 'Properties', icon: Home, href: '/properties' },
  { name: 'Units', icon: DoorClosed, href: '/units' },
  { name: 'Tenants', icon: Users2, href: '/tenants' },
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
            <p className="font-semibold border border-border py-0.5 px-1.5 text-sm bg-primary text-primary-foreground">
              LeaseUp
            </p>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={cn(
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium items-center',
                          {
                            'bg-muted/50 text-primary': isCurrentUrl(
                              item.href,
                              path as string,
                            ),
                            'text-gray-700 hover:text-primary hover:bg-gray-50 transition-all':
                              !isCurrentUrl(item.href, path as string),
                          },
                        )}
                      >
                        <item.icon
                          className={cn('h-4 w-4 shrink-0', {
                            'text-primary': isCurrentUrl(
                              item.href,
                              path as string,
                            ),
                            'text-gray-400 group-hover:text-indigo-600':
                              !isCurrentUrl(item.href, path as string),
                          })}
                          aria-hidden="true"
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

      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 lg:mx-auto lg:max-w-7xl lg:px-8">
          <div className="flex h-16 items-center gap-x-4  bg-white px-4  sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
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
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={cn(
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium items-center',
                                    {
                                      'bg-muted/50 text-primary': isCurrentUrl(
                                        item.href,
                                        path as string,
                                      ),
                                      'text-gray-700 hover:text-primary hover:bg-gray-50 transition-all':
                                        !isCurrentUrl(
                                          item.href,
                                          path as string,
                                        ),
                                    },
                                  )}
                                >
                                  <item.icon
                                    className={cn('h-4 w-4 shrink-0', {
                                      'text-primary': isCurrentUrl(
                                        item.href,
                                        path as string,
                                      ),
                                      'text-gray-400 group-hover:text-indigo-600':
                                        !isCurrentUrl(
                                          item.href,
                                          path as string,
                                        ),
                                    })}
                                    aria-hidden="true"
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

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form
                className="relative flex flex-1 mt-2"
                action="#"
                method="GET"
              >
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <Search
                  className="pointer-events-none absolute inset-y-0 left-2 h-full w-4 text-gray-400"
                  aria-hidden="true"
                />
                <Input
                  className="block h-full w-full border-none py-0 pr-2 pl-8 text-gray-900 shadow-none placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Search for anything"
                  type="search"
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <UserButton />
              </div>
            </div>
          </div>
        </div>

        <main>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
