import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const propertyRouter = createTRPCRouter({
  get: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.property.findMany({
      select: {
        name: true,
        street: true,
        city: true,
        province: true,
        zip: true,
      },
    });
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
              rent: z.string().min(0),
              bedrooms: z.string().min(0),
              bathrooms: z.string().min(0),
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
        },
      });
    }),
});
