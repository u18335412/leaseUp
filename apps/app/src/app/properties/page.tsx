/* eslint-disable @typescript-eslint/require-await -- Expected this a a server component */
import type { NextPage } from 'next';
import { Home, Plus } from 'lucide-react';
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateFooter,
  EmptyStateTitle,
  buttonVariants,
} from 'ui';
import Link from 'next/link';
import { cn } from 'lib';
import { PageHeader, PageHeaderHeading } from '@/components/PageHeading';

const Properties: NextPage = async () => {
  return (
    <div>
      <PageHeader className="flex flex-row max-w-none items-center justify-between">
        <PageHeaderHeading>Properties</PageHeaderHeading>
        <Link
          className={cn(buttonVariants(), 'flex items-center gap-x-2')}
          href="/properties/create-property"
        >
          <Plus aria-hidden="true" className="w-4 h-4" />
          Create Property
        </Link>
      </PageHeader>

      <div>
        <EmptyState>
          <div className="flex justify-center">
            <span className="border-2 p-2 rounded-full">
              <Home aria-hidden="true" className="w-5 h-5 text-gray-400" />
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
              <Plus aria-hidden="true" className="w-4 h-4" />
              Create Property
            </Link>
          </EmptyStateFooter>
        </EmptyState>
      </div>
    </div>
  );
};

export default Properties;
