"use client";

import { FC, useEffect } from "react";
import { createContext, useContext, useRef } from "react";
import { cn } from "lib/cn";
import { buttonVariants } from "ui";
import { StoreApi, createStore } from "zustand";
import { useStoreWithEqualityFn } from "zustand/traditional";

interface MultiStepFormState {
  totalSteps: number;
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
  incrementTotalSteps: () => void;
  decrementTotalSteps: () => void;
  setCurrentStep: (step: number) => void;
}

const StoreContext = createContext<StoreApi<MultiStepFormState> | null>(null);

const MultiStepForm: FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  const storeRef = useRef<any>();
  if (!storeRef.current) {
    storeRef.current = createStore<MultiStepFormState>((set) => ({
      totalSteps: 0,
      currentStep: 0,
      nextStep: () =>
        set((state) => ({
          currentStep:
            state.currentStep < state.totalSteps
              ? state.currentStep + 1
              : state.currentStep,
        })),
      previousStep: () =>
        set((state) => ({
          currentStep: state.currentStep === 0 ? 0 : state.currentStep - 1,
        })),
      incrementTotalSteps: () =>
        set((state) => ({ totalSteps: state.totalSteps + 1 })),
      decrementTotalSteps: () =>
        set((state) => ({ totalSteps: state.totalSteps - 1 })),
      setCurrentStep: (step) =>
        set((state) => ({ currentStep: state.currentStep + step })),
    }));
  }
  return (
    <StoreContext.Provider value={storeRef.current || null}>
      <div className={cn("w-96", className)} {...props}>
        {children}
      </div>
    </StoreContext.Provider>
  );
};

const useMultiStepForm = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error(
      "MultiStepFormStep, MultiStepFormNextStep, MultiStepFormPreviousStep must be used within MultiStepForm",
    );
  }
  return useStoreWithEqualityFn(store);
};

const MultiStepFormStep: FC<
  React.HTMLAttributes<HTMLDivElement> & {
    stepIndex: number;
  }
> = ({ className, children, stepIndex, ...props }) => {
  const { currentStep, incrementTotalSteps, decrementTotalSteps } =
    useMultiStepForm();

  useEffect(() => {
    incrementTotalSteps();
    return () => {
      decrementTotalSteps();
    };
  }, []);

  if (stepIndex - 1 === currentStep)
    return (
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    );
};

const MultiStepFormNextStep: FC<React.HTMLAttributes<HTMLButtonElement>> = ({
  className,
  children,
  ...props
}) => {
  const { nextStep, currentStep, totalSteps } = useMultiStepForm();
  return (
    <button
      disabled={currentStep === totalSteps || currentStep === totalSteps - 1}
      className={cn(buttonVariants(), className)}
      onClick={() => nextStep()}
      {...props}
    >
      {children}
    </button>
  );
};

const MultiStepFormPreviousStep: FC<
  React.HTMLAttributes<HTMLButtonElement>
> = ({ className, children, ...props }) => {
  const { previousStep, currentStep } = useMultiStepForm();
  return (
    <button
      disabled={currentStep === 0 ? true : false}
      className={cn(
        buttonVariants({
          variant: "outline",
        }),
        className,
      )}
      onClick={() => previousStep()}
      {...props}
    >
      {children}
    </button>
  );
};

const MultiStepFormStepTitle: FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => (
  <h3
    className={cn(
      "text-lg font-bold leading-10 tracking-tight text-black",
      className,
    )}
    {...props}
  >
    {children}
  </h3>
);

const MultiStepFormStepDescription: FC<
  React.HTMLAttributes<HTMLParagraphElement>
> = ({ className, ...props }) => (
  <p
    className={cn(
      "text-muted-foreground max-w-xs text-base font-light leading-6",
      className,
    )}
    {...props}
  />
);

export {
  MultiStepForm,
  MultiStepFormStep,
  MultiStepFormNextStep,
  MultiStepFormPreviousStep,
  MultiStepFormStepTitle,
  MultiStepFormStepDescription,
};
