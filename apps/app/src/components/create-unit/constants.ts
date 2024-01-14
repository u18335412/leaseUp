import * as z from "zod";

const createUnitSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter a unit name",
  }),
  bathrooms: z.coerce.number().min(1, {
    message: "Please enter a number of bedrooms",
  }).default(0),
  bedrooms: z.coerce.number().min(1, {
    message: "Please enter a number of bathrooms",
  }).default(0),
  deposit: z.coerce
    .number()
    .min(1, {
      message: "Please enter a deposit amount",
    })
    .default(0),
  rent: z.coerce
    .number()
    .min(1, {
      message: "Please enter a rent amount",
    })
    .default(0),
});

const createUnitFormFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
  },
  {
    name: "bedrooms",
    label: "Number of Beds",
    type: "number",
  },
  {
    name: "bathrooms",
    label: "Number of Baths",
    type: "number",
  },
  {
    name: "deposit",
    label: "Deposit Amount",
    type: "number",
  },
  {
    name: "rent",
    label: "Rent Amount",
    type: "number",
  },
] as const;

export { createUnitSchema, createUnitFormFields };
