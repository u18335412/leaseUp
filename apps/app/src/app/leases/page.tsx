"use client";

/* eslint-disable @typescript-eslint/require-await -- Expected Server component */
import type { NextPage } from "next";
import Link from "next/link";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-heading";
import { FileText, Plus } from "lucide-react";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateFooter,
  EmptyStateTitle,
  buttonVariants,
} from "ui";

const Leases: NextPage = () => {
  return (
    <div>
      <PageHeader className="flex max-w-none flex-row items-center justify-between">
        <div>
          <PageHeaderHeading>Leases</PageHeaderHeading>
          <PageHeaderDescription>
            Manage all your leases between you and your tenants in one place.
          </PageHeaderDescription>
        </div>
        <div>
          <Link href="/leases/create-lease" className={buttonVariants({})}>
            <Plus aria-hidden="true" className="mr-2 h-4 w-4" />
            Create Lease
          </Link>
        </div>
      </PageHeader>

      <div>
        <EmptyState>
          <div className="flex justify-center">
            <span className="rounded-full border-2 p-2">
              <FileText aria-hidden="true" className="h-5 w-5 text-gray-400" />
            </span>
          </div>
          <EmptyStateTitle>No Leases</EmptyStateTitle>
          <EmptyStateDescription>
            Create a lease to get started.
          </EmptyStateDescription>
          <EmptyStateFooter>
            <Link href="/leases/create-lease" className={buttonVariants({})}>
              <Plus aria-hidden="true" className="mr-2 h-4 w-4" />
              Create Lease
            </Link>
          </EmptyStateFooter>
        </EmptyState>
      </div>
    </div>
  );
};

export default Leases;
