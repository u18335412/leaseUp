import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const unitRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(
      z.object({
        unitId: z.string().min(1, {
          message: "unit id is required.",
        }),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.unit.findFirstOrThrow({
        where: {
          id: input.unitId,
        },
        select: {
          name: true,
          bedrooms: true,
          bathrooms: true,
          rent: true,
          deposit: true,
          Lease: true,
        },
      });
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userProperties = await ctx.prisma.unit.findMany({
      where: {
        property: {
          propertyOwnerId: ctx.auth.userId as string,
        },
      },
      select: {
        id: true,
        name: true,
        bedrooms: true,
        bathrooms: true,
        rent: true,
        deposit: true,
        Lease: {
          select: {
            id: true,
          },
        },
      },
    });
    return userProperties;
  }),
});
