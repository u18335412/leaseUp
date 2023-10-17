import { PropertyDescription, PropertyType } from '@prisma/client';
import { Home, School, Building2, Building, Warehouse } from 'lucide-react';
import * as z from 'zod';

const propertyDescription = [
  {
    name: 'COMMERCIAL',
    label: 'Commercial',
    icon: Warehouse,
  },
  {
    name: 'RESIDENTIAL',
    label: 'Residential',
    icon: Home,
  },
] as const;
const propertyTypes = [
  {
    name: 'SINGLEFAMILY',
    label: 'Single Family',
    icon: Home,
  },
  {
    name: 'MULTIFAMILY',
    label: 'Multi Family',
    icon: Building2,
  },
  {
    name: 'APARTMENT',
    label: 'Apartment',
    icon: Building,
  },

  {
    name: 'TOWNHOUSE',
    label: 'Townhouse',
    icon: School,
  },
  {
    name: 'OTHER',
    label: 'Other',
    icon: Home,
  },
] as const;

const createPropertyFormSchema = z.object({
  propertyDescription: z.enum(
    propertyDescription.map((prop) => prop.name) as [string, ...string[]],
    {
      required_error: 'Please select a property description.',
    },
  ),

  propertyType: z.enum(
    propertyTypes.map((prop) => prop.name) as [string, ...string[]],
    {
      required_error: 'Please select a property type.',
    },
  ),
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  street: z.string().min(2, {
    message: 'Street must be at least 2 characters.',
  }),
  city: z.string().min(2, {
    message: 'City must be at least 2 characters.',
  }),
  province: z.string().min(2, {
    message: 'Province must be at least 2 characters.',
  }),
  zip: z.string().min(2, {
    message: 'Post code must be at least 2 characters.',
  }),
  country: z.string().min(2, {
    message: 'Country must be at least 2 characters.',
  }),
  units: z
    .array(
      z.object({
        name: z.string().min(2, {
          message: 'Unit name must be at least 2 characters.',
        }),
        rent: z.number().min(1, {
          message: 'Rent must be at least 1.',
        }),

        bedrooms: z.number().min(1, {
          message: 'Bedrooms must be at least 1.',
        }),
        bathrooms: z.number().min(1, {
          message: 'Bathrooms must be at least 1.',
        }),
      }),
    )
    .optional(),
});

const formFields = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    placeholder: 'Property at somewhere',
  },
  {
    label: 'Street',
    name: 'street',
    type: 'text',
    placeholder: '6692 Tranquility St',
  },
  {
    label: 'City',
    name: 'city',
    type: 'text',
    placeholder: 'Johannesburg',
  },
  {
    label: 'Province',
    name: 'province',
    type: 'text',
    placeholder: 'Gauteng',
  },
  {
    label: 'Post code/Zip',
    name: 'zip',
    type: 'text',
    placeholder: '2190',
  },
  {
    label: 'Country',
    name: 'country',
    type: 'text',
    placeholder: 'South Africa',
  },
] as const;

export {
  propertyDescription,
  propertyTypes,
  createPropertyFormSchema,
  formFields,
};
