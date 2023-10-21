import * as z from 'zod';

const createUnitSchema = z.object({
  propertyId: z.string().min(1, {
    message: 'Please select a property',
  }),
  name: z.string().min(1, {
    message: 'Please enter a unit name',
  }),
  numberOfBeds: z.number().min(1, {
    message: 'Please enter a number of bedrooms',
  }),

  numberOfBaths: z.number().min(1, {
    message: 'Please enter a number of bathrooms',
  }),
  rent: z.number().min(1, {
    message: 'Please enter a rent amount',
  }),
});

const createUnitFormFields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    name: 'numberOfBeds',
    label: 'Number of Beds',
    type: 'number',
  },
  {
    name: 'numberOfBaths',
    label: 'Number of Baths',
    type: 'number',
  },
  {
    name: 'rent',
    label: 'Rent',
    type: 'number',
  },
] as const;

export { createUnitSchema, createUnitFormFields };
