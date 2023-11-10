import { createTRPCRouter, protectedProcedure } from "../trpc";
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
          Unit: {
            select: {
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
          },
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
      await ctx.prisma.property.create({
        data: {
          name: input.name,
          street: input.street,
          city: input.city,
          province: input.province,
          zip: input.zip,
          country: input.country,
          propertyOwnerId: ctx.auth.userId as string,
          Unit: {
            create: input.units || [],
          },
        },
      });
    }),
});
