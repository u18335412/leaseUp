"use client";

import { FC, useEffect } from "react";
import { createContext, useContext, useRef } from "react";
import { cn } from "lib/cn";
import { buttonVariants } from "ui";
import { StoreApi, createStore } from "zustand";
import { useStoreWithEqualityFn } from "zustand/traditional";

interface StepperStore {
  totalSteps: number;
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
  incrementTotalSteps: () => void;
  decrementTotalSteps: () => void;
  setCurrentStep: (step: number) => void;
}

const StoreContext = createContext<StoreApi<StepperStore> | null>(null);

const Stepper: FC<
  React.HTMLAttributes<HTMLDivElement> & {
    onStepChange: (step: number) => void;
  }
> = ({ className, children, onStepChange, ...props }) => {
  const storeRef = useRef<StoreApi<StepperStore>>();
  if (!storeRef.current) {
    storeRef.current = createStore<StepperStore>((set) => ({
      totalSteps: 0,
      currentStep: 0,
      nextStep: () =>
        set((state) => {
          const step =
            state.currentStep < state.totalSteps
              ? state.currentStep + 1
              : state.currentStep;
          onStepChange(step);
          return {
            currentStep: step,
          };
        }),
      previousStep: () =>
        set((state) => {
          const step = state.currentStep === 0 ? 0 : state.currentStep - 1;
          onStepChange(step);
          return {
            currentStep: step,
          };
        }),
      incrementTotalSteps: () =>
        set((state) => ({ totalSteps: state.totalSteps + 1 })),
      decrementTotalSteps: () =>
        set((state) => ({ totalSteps: state.totalSteps - 1 })),
      setCurrentStep: (step) => set(() => ({ currentStep: step })),
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

const StepperStep: FC<
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
      <div
        className={cn(
          "animate-in md:fade-in slide-in-from-left-2 md:slide-in-from-left-0 w-full",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
};

const StepperNextStep: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  children,
  type = "button",
  ...props
}) => {
  const { nextStep, currentStep, totalSteps } = useMultiStepForm();
  return (
    <button
      type={type}
      disabled={currentStep === totalSteps || currentStep === totalSteps - 1}
      className={cn(buttonVariants(), className)}
      onClick={() => nextStep()}
      {...props}
    >
      {children}
    </button>
  );
};

const StepperPreviousStep: FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, children, ...props }) => {
  const { previousStep, currentStep } = useMultiStepForm();
  return (
    <button
      type="button"
      disabled={currentStep === 0}
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

const StepperStepTitle: FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => (
  <h3
    className={cn(
      "font-bold leading-10 tracking-tight text-black md:text-lg",
      className,
    )}
    {...props}
  >
    {children}
  </h3>
);

const StepperStepDescription: FC<
  React.HtmlHTMLAttributes<HTMLParagraphElement>
> = ({ className, ...props }) => (
  <p
    className={cn(
      "text-muted-foreground max-w-xs text-base font-light leading-6",
      className,
    )}
    {...props}
  />
);

const StepperStepContent: FC<
  React.HtmlHTMLAttributes<HTMLParagraphElement>
> = ({ className, ...props }) => (
  <div className={cn("mt-4", className)} {...props} />
);

export {
  Stepper,
  StepperStep,
  StepperNextStep,
  StepperPreviousStep,
  StepperStepTitle,
  StepperStepDescription,
  StepperStepContent,
};
