import {
  Home,
  School,
  Building2,
  Building,
  Warehouse,
  UserX,
  UserCheck,
} from "lucide-react";
import * as z from "zod";

const propertyDescription = [
  {
    name: "COMMERCIAL",
    label: "Commercial",
    icon: Warehouse,
  },
  {
    name: "RESIDENTIAL",
    label: "Residential",
    icon: Home,
  },
] as const;

const propertyTypes = [
  {
    name: "SINGLEFAMILY",
    label: "Single Family",
    icon: Home,
  },
  {
    name: "MULTIFAMILY",
    label: "Multi Family",
    icon: Building2,
  },
  {
    name: "APARTMENT",
    label: "Apartment",
    icon: Building,
  },

  {
    name: "TOWNHOUSE",
    label: "Townhouse",
    icon: School,
  },
  {
    name: "OTHER",
    label: "Other",
    icon: Home,
  },
] as const;

const propertyOwners = [
  {
    name: "OWNED",
    label: "Owned by me",
    icon: UserCheck,
  },
  {
    name: "SOMEONE_ELSE",
    label: "Owned by others",
    icon: UserX,
  },
] as const;

const createPropertyFormSchema = z.object({
  propertyDescription: z.enum(
    propertyDescription.map((prop) => prop.name) as [string, ...string[]],
    {
      required_error: "Please select a property description.",
    },
  ),

  propertyType: z.enum(
    propertyTypes.map((prop) => prop.name) as [string, ...string[]],
    {
      required_error: "Please select a property type.",
    },
  ),
  propertyDetails: z.object({
    name: z.string().min(1, {
      message: "Required.",
    }),
    street: z.string().min(1, {
      message: "Required.",
    }),
    city: z.string().min(1, {
      message: "Required.",
    }),
    province: z.string().min(1, {
      message: "Required.",
    }),
    zip: z.string().min(1, {
      message: "Required.",
    }),
    country: z.string().min(1, {
      message: "Required.",
    }),
  }),
  units: z
    .array(
      z.object({
        name: z.string().min(1, {
          message: "Required.",
        }),
        rent: z.coerce.number().min(1, {
          message: "Required.",
        }),

        bedrooms: z.coerce.number().min(1, {
          message: "Required.",
        }),
        bathrooms: z.coerce.number().min(1, {
          message: "Required.",
        }),
      }),
    )
    .optional(),
  propertyOwnership: z
    .object({
      ownershipType: z.enum(["OWNED", "SOMEONE_ELSE"]),
      propertyOwners: z.array(
        z.object({
          firstName: z.string().min(1, {
            message: "Required.",
          }),
          lastName: z.string().min(1, {
            message: "Required.",
          }),
          email: z.string().email({
            message: "Required.",
          }),
          percentageOwned: z.string().min(1, {
            message: "Required.",
          }),
        }),
      ),
    })
    .refine(
      (data) => {
        if (data.ownershipType === "SOMEONE_ELSE")
          return data.propertyOwners.length > 0;
        return true;
      },
      {
        message: "Please add at least one owner.",
      },
    ),
});

const formFields = [
  {
    label: "Name",
    name: "propertyDetails.name",
    type: "text",
    placeholder: "Property at somewhere",
  },
  {
    label: "Street",
    name: "propertyDetails.street",
    type: "text",
    placeholder: "Tranquility Street",
  },
  {
    label: "City",
    name: "propertyDetails.city",
    type: "text",
    placeholder: "Johannesburg",
  },
  {
    label: "Province",
    name: "propertyDetails.province",
    type: "text",
    placeholder: "Gauteng",
  },
  {
    label: "Post code/Zip",
    name: "propertyDetails.zip",
    type: "text",
    placeholder: "2190",
  },
  {
    label: "Country",
    name: "propertyDetails.country",
    type: "text",
    placeholder: "South Africa",
  },
] as const;

const ownerFields = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "percentageOwned",
    label: "Percentage Owned",
    type: "number",
  },
] as const;

const unitFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
  },
  {
    name: "bedrooms",
    label: "Bedrooms",
    type: "number",
  },
  {
    name: "bathrooms",
    label: "Bathrooms",
    type: "number",
  },
  {
    name: "rent",
    label: "Rent",
    type: "number",
  },
] as const;

export {
  propertyDescription,
  propertyTypes,
  createPropertyFormSchema,
  formFields,
  propertyOwners,
  ownerFields,
  unitFields,
};
