import { NextPage } from 'next';
import { Home } from 'lucide-react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  EmptyState,
  EmptyStateDescription,
  EmptyStateFooter,
  EmptyStateTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  buttonVariants,
} from 'ui';
import * as z from 'zod';
import { Plus } from 'lucide-react';
import { PageHeader, PageHeaderHeading } from '@/components/PageHeading';
import Link from 'next/link';
import { cn } from 'lib';

const Properties: NextPage = async () => {
  return (
    <div>
      <PageHeader className="flex flex-row max-w-none items-center justify-between">
        <PageHeaderHeading>Properties</PageHeaderHeading>
        <Link
          href="/properties/create-property"
          className={cn(buttonVariants(), 'flex items-center gap-x-2')}
        >
          <Plus aria-hidden="true" className="w-4 h-4" />
          Create Property
        </Link>
      </PageHeader>

      <div>
        <EmptyState>
          <div className="flex justify-center">
            <span className="border-2 p-2 rounded-full">
              <Home className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </span>
          </div>
          <EmptyStateTitle>No Properties</EmptyStateTitle>
          <EmptyStateDescription>
            You haven't created any properties yet.
          </EmptyStateDescription>
          <EmptyStateFooter>
            <Link
              href="/properties/create-property"
              className={cn(buttonVariants(), 'flex items-center gap-x-2')}
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
