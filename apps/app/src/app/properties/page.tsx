/* eslint-disable @typescript-eslint/require-await -- Expected this a a server component */
import type { NextPage } from 'next';
import Link from 'next/link';
import { cn } from 'lib';
import { Home, Plus } from 'lucide-react';
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateFooter,
  EmptyStateTitle,
  buttonVariants,
} from 'ui';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-heading';

const Properties: NextPage = async () => {
  return (
    <div>
      <PageHeader className="flex max-w-none flex-row items-center justify-between">
        <div>
          <PageHeaderHeading>Properties</PageHeaderHeading>
          <PageHeaderDescription>
            Properties are the physical locations that you rent out to tenants.
          </PageHeaderDescription>
        </div>
        <Link
          className={cn(buttonVariants(), 'flex items-center gap-x-2')}
          href="/properties/create-property"
        >
          <Plus aria-hidden="true" className="h-4 w-4" />
          Create Property
        </Link>
      </PageHeader>

      <div>
        <EmptyState>
          <div className="flex justify-center">
            <span className="rounded-full border-2 p-2">
              <Home aria-hidden="true" className="h-5 w-5 text-gray-400" />
            </span>
          </div>
          <EmptyStateTitle>No Properties</EmptyStateTitle>
          <EmptyStateDescription>
            You haven&apos;t created any properties yet.
          </EmptyStateDescription>
          <EmptyStateFooter>
          <Link
          className={cn(buttonVariants(), 'flex items-center gap-x-2')}
          href="/properties/create-property"
        >
          <Plus aria-hidden="true" className="h-4 w-4" />
          Create Property
        </Link>
          </EmptyStateFooter>
        </EmptyState>
      </div>
    </div>
  );
};

export default Properties;
