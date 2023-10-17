/* eslint-disable @typescript-eslint/require-await -- Expected Server component */
import type { NextPage } from 'next';
import { DoorClosed } from 'lucide-react';
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateFooter,
  EmptyStateTitle,
} from 'ui';
import { PageHeader, PageHeaderHeading } from '@/components/PageHeading';
import { CreateUnit } from '@/components/create-unit/create-unit-modal';

const Units: NextPage = async () => {
  return (
    <div>
      <PageHeader className="flex flex-row max-w-none items-center justify-between">
        <PageHeaderHeading>Units</PageHeaderHeading>
        <div>
          <CreateUnit />
        </div>
      </PageHeader>

      <div>
        <EmptyState>
          <div className="flex justify-center">
            <span className="border-2 p-2 rounded-full">
              <DoorClosed
                aria-hidden="true"
                className="w-5 h-5 text-gray-400"
              />
            </span>
          </div>
          <EmptyStateTitle>No Units</EmptyStateTitle>
          <EmptyStateDescription>
            You haven&apos;t created any units yet.
          </EmptyStateDescription>
          <EmptyStateFooter>
            <CreateUnit />
          </EmptyStateFooter>
        </EmptyState>
      </div>
    </div>
  );
};

export default Units;
