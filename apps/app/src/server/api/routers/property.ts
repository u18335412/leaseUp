import { createTRPCRouter, protectedProcedure } from "../trpc";
import { PropertyDescription } from "@prisma/client";
import { z } from "zod";

export const propertyRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(
      z.object({
        propertyId: z.string().min(1, {
          message: "propertyId is required",
        }),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.property.findFirstOrThrow({
        where: {
          id: input.propertyId,
        },
        select: {
          name: true,
          street: true,
          city: true,
          province: true,
          zip: true,
          country: true,
        },
      });
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userProperties = await ctx.prisma.property.findMany({
      where: {
        propertyOwnerId: ctx.auth.userId as string,
      },
      select: {
        id: true,
        name: true,
        street: true,
        city: true,
        province: true,
        zip: true,
        country: true,
        createdAt: true,
        type: true,
        description: true,
        Unit: {
          select: {
            id: true,
          },
        },
      },
    });
    return userProperties;
  }),
  post: protectedProcedure
    .input(
      z.object({
        city: z.string().min(1),
        name: z.string().min(1),
        street: z.string().min(1),
        zip: z.string().min(1),
        province: z.string().min(1),
        country: z.string().min(1),
        description: z.enum([
          PropertyDescription.APARTMENT,
          PropertyDescription.HOUSE,
          PropertyDescription.MULTIFAMILY,
          PropertyDescription.SINGLEFAMILY,
          PropertyDescription.TOWNHOUSE,
          PropertyDescription.OTHER,
        ]),
        units: z
          .array(
            z.object({
              name: z.string().min(1),
              rent: z.number(),
              bedrooms: z.number(),
              bathrooms: z.number(),
            }),
          )
          .optional(),
        owners: z
          .array(
            z.object({
              firstName: z.string().min(1),
              lastName: z.string().min(1),
              email: z.string().min(1),
              percentageOwned: z.string().min(1),
            }),
          )
          .optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("mutation", {
        input,
        ctx: ctx.auth,
      });
      const { name, street, city, province, zip, country, description, units } =
        input;
      return await ctx.prisma.property.create({
        data: {
          name: name,
          street: street,
          city: city,
          province: province,
          zip: zip,
          country: country,
          propertyOwnerId: ctx.auth.userId as string,
          description: description,
          Unit: {
            create: units || [],
          },
        },
      });
    }),
  getUnits: protectedProcedure
    .input(
      z.object({
        propertyId: z.string().min(1, {
          message: "property id is required",
        }),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.unit.findMany({
        where: {
          propertyId: input.propertyId,
        },
        select: {
          propertyId: true,
          id: true,
          name: true,
          rent: true,
          bedrooms: true,
          bathrooms: true,
          deposit: true,
          Lease: {
            select: {
              id: true,
            },
          },
        },
      });
    }),
  getTenants: protectedProcedure.input(z.object({})).query(async ({ ctx }) => {
    const tenants = await ctx.prisma.tenant.findMany({
      where: {},
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        LeaseTenant: {
          select: {
            Lease: {
              select: {
                id: true,
              },
            },
          },
        },
        createdAt: true,
      },
    });
    return tenants;
  }),
  getLeases: protectedProcedure
    .input(
      z.object({
        propertyId: z.string().min(1, {
          message: "property id is required",
        }),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.lease.findMany({
        where: {
          Unit: {
            every: {
              propertyId: input.propertyId,
            },
          },
        },
        select: {
          id: true,
          LeaseTenant: {
            select: {
              Lease: true,
            },
          },
        },
      });
    }),
  getDocuments: protectedProcedure
    .input(
      z.object({
        propertyId: z.string().min(1, {
          message: "property id is required",
        }),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.lease.findMany({
        where: {
          Unit: {
            every: {
              propertyId: input.propertyId,
            },
          },
        },
        select: {
          id: true,
          LeaseTenant: {
            select: {
              Lease: true,
            },
          },
        },
      });
    }),
  createUnit: protectedProcedure
    .input(
      z.object({
        propertyId: z.string().min(1, {
          message: "property id is required",
        }),
        name: z.string().min(1, {
          message: "unit name is required",
        }),
        rent: z.coerce.number().min(1, {
          message: "rent is required",
        }),
        deposit: z.coerce.number().min(1, {
          message: "deposit is required",
        }),
        bedrooms: z.coerce.number().min(1, {
          message: "bedrooms is required",
        }),
        bathrooms: z.coerce.number().min(1, {
          message: "bathrooms is required",
        }),
      }),
    )
    .mutation(
      ({
        ctx,
        input: { name, bathrooms, bedrooms, propertyId, rent, deposit },
      }) => {
        return ctx.prisma.unit.create({
          data: {
            name,
            bathrooms,
            bedrooms,
            propertyId,
            rent,
            deposit,
          },
        });
      },
    ),
  deleteUnit: protectedProcedure
    .input(
      z.object({
        unitId: z.string().min(1, {
          message: "unit id is required.",
        }),
      }),
    )
    .mutation(({ ctx, input: { unitId } }) => {
      return ctx.prisma.unit.delete({
        where: {
          id: unitId,
        },
      });
    }),
});
