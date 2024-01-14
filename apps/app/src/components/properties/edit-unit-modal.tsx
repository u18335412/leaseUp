import { Dispatch, FC, SetStateAction } from "react";
import { Unit } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "ui";

const EditUnitModal: FC<{
  unit: Unit;
  isOpen: true;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ unit, isOpen, setIsOpen }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Unit</DialogTitle>
          <DialogDescription>Edit the details of this unit.</DialogDescription>
        </DialogHeader>
        <div>  
        </div>
      </DialogContent>
    </Dialog>
  );
};
