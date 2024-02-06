"use client";

import { FC } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  Button,
} from "ui";

export const DeleteTenant: FC = () => {
  const path = usePathname();
  const params = useSearchParams();
  const router = useRouter();

  const deleteTenantMutation = api.tenant.deleteTenant.useMutation();

  const isOpen = params.get("modal") === "deleteTenant";
  const fullName = params.get("fullName");
  const tenantId = params.get("tenantId");

  const handleDelete = () => {
    deleteTenantMutation.mutate(
      {
        tenantId: tenantId as string,
      },
      {
        onSuccess: () => {
          router.push(path);
          toast.success("Tenant deleted successfully");
          router.refresh();
        },
        onError: () => {
          toast.error("Failed to delete tenant, please try again later.");
        },
      },
    );
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogTitle>Delete tenant</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete{" "}
          <span className="underline">{fullName}</span>? This action cannot be
          undone.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => router.push(path)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            isLoading={deleteTenantMutation.isLoading}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
