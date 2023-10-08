import { NextPage } from 'next';
import { DoorClosed } from 'lucide-react';
import {
  Button,
  EmptyState,
  EmptyStateDescription,
  EmptyStateFooter,
  EmptyStateTitle,
} from 'ui';
import { Plus } from 'lucide-react';
import { PageHeader, PageHeaderHeading } from '@/components/PageHeading';

const Units: NextPage = async () => {
  return (
    <div>
      <PageHeader className="flex flex-row max-w-none items-center justify-between">
        <PageHeaderHeading>Units</PageHeaderHeading>
        <Button className="flex gap-x-2" size="sm">
          <Plus className="w-5 h-5" />
          Create Unit
        </Button>
      </PageHeader>

      <div>
        <EmptyState>
          <div className="flex justify-center">
            <DoorClosed
              aria-hidden="true"
              className="w-12 h-12 text-gray-400"
            />
          </div>
          <EmptyStateTitle>No Units</EmptyStateTitle>
          <EmptyStateDescription>
            You haven't created any units yet.
          </EmptyStateDescription>
          <EmptyStateFooter>
            <Button className="flex gap-x-2" size="sm">
              <Plus className="w-5 h-5" />
              Create Unit
            </Button>
          </EmptyStateFooter>
        </EmptyState>
      </div>
    </div>
  );
};

export default Units;
