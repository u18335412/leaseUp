"use client";

import { PageSubheading } from "@/components/page-heading";
import { Archive, ChevronDown, Plus, Search } from "lucide-react";
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EmptyState,
  EmptyStateDescription,
  EmptyStateFooter,
  EmptyStateTitle,
  Input,
} from "ui";

export default function Documents({ params }: { params: { id: string } }) {
  const documents = {
    length: 0,
  };
  return (
    <div>
      <div>
        <PageSubheading className="text-lg font-bold tracking-tight">
          Document({documents.length})
        </PageSubheading>
        <p>View and manage all the documents for this property.</p>
      </div>
      {documents.length > 0 ? (
        <>
          <div className="mt-4 flex items-center justify-between">
            <div className="relative w-96">
              <Search
                className="text-muted-foreground pointer-events-none absolute left-2 top-2.5 h-4 w-4"
                aria-hidden="true"
              />
              <Input
                placeholder="Search for a document."
                className="w-full pl-8 pr-2"
                type="search"
              />
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenuCheckboxes />
              <Button>
                <Plus aria-hidden="true" className="mr-2 h-4 w-4" />
                Add Document
              </Button>
            </div>
          </div>
          <div>
            <div></div>
          </div>
        </>
      ) : (
        <EmptyState>
          <div>
            <Archive
              aria-hidden="true"
              className="text-muted-foreground mx-auto h-10 w-10 rounded-full border p-2"
            />
          </div>
          <EmptyStateTitle>No Documents</EmptyStateTitle>
          <EmptyStateDescription>
            There are no documents for this property.
          </EmptyStateDescription>
          <EmptyStateFooter>
            <Button size="sm">
              <Plus aria-hidden="true" className="mr-2 h-4 w-4" />
              Create Document
            </Button>
          </EmptyStateFooter>
        </EmptyState>
      )}
    </div>
  );
}

function DropdownMenuCheckboxes() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Filters
          <ChevronDown
            aria-hidden="true"
            className="text-muted-foreground ml-2 h-4 w-4"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem>Vacant</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Occupied</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
