import { NextPage } from 'next';
import { Home } from 'lucide-react';
import {
  Button,
  EmptyState,
  EmptyStateDescription,
  EmptyStateFooter,
  EmptyStateTitle,
} from 'ui';
import { Plus } from 'lucide-react';
import { PageHeader, PageHeaderHeading } from '@/components/PageHeading';

const Properties: NextPage = async () => {
  return (
    <div>
      <PageHeader className="flex flex-row max-w-none items-center justify-between">
        <PageHeaderHeading>Properties</PageHeaderHeading>
        <Button className="flex gap-x-2" size="sm">
          <Plus className="w-5 h-5" />
          Create Property
        </Button>
      </PageHeader>

      <div>
        <EmptyState>
          <div className="flex justify-center">
            <Home className="w-12 h-12 text-gray-400" />
          </div>
          <EmptyStateTitle>No Properties</EmptyStateTitle>
          <EmptyStateDescription>
            You haven't created any properties yet.
          </EmptyStateDescription>
          <EmptyStateFooter>
            <Button className="flex gap-x-2" size="sm">
              <Plus className="w-5 h-5" />
              Create Property
            </Button>
          </EmptyStateFooter>
        </EmptyState>
      </div>
    </div>
  );
};

export default Properties;
