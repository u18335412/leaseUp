/* eslint-disable @typescript-eslint/require-await -- Expected Server component */
import type { NextPage } from 'next';
import { DoorClosed } from 'lucide-react';
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateFooter,
  EmptyStateTitle,
} from 'ui';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-heading';
import { CreateUnit } from '@/components/create-unit/create-unit-modal';

const Units: NextPage = async () => {
  return (
    <div>
      <PageHeader className="flex max-w-none flex-row items-center justify-between">
        <div>
          <PageHeaderHeading>Units</PageHeaderHeading>
          <PageHeaderDescription>
            Units are the physical spaces within properties that you rent out to
            tenants.
          </PageHeaderDescription>
        </div>
        <div>
          <CreateUnit />
        </div>
      </PageHeader>

      <div>
        <EmptyState>
          <div className="flex justify-center">
            <span className="rounded-full border-2 p-2">
              <DoorClosed
                aria-hidden="true"
                className="h-5 w-5 text-gray-400"
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
