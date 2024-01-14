"use client";

import { FC } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  Button,
} from "ui";

export const DeleteUnitModal: FC = () => {
  const deleteUnitMutation = api.property.deleteUnit.useMutation();

  const path = usePathname();
  const params = useSearchParams();
  const router = useRouter();

  const isOpen = params.get("modal") === "delete";
  const unitName = params.get("name");

  const handleDelete = () => {
    deleteUnitMutation.mutate(
      {
        unitId: params.get("unit") as string,
      },
      {
        onSuccess: () => {
          toast.success("Unit deleted successfully");
          router.push(path);
          router.refresh();
        },
        onError: () => {
          toast.error("Failed to delete unit, please try again later.");
        },
      },
    );
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Unit</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="underline">{unitName}</span> unit? This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant="secondary"
            onClick={() => {
              router.push(path);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            isLoading={deleteUnitMutation.isLoading}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
