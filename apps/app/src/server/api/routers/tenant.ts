import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const tenantRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(
      z.object({
        tenantId: z.string().min(1, {
          message: "tenant id is required",
        }),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.tenant.findFirstOrThrow({
        where: {
          id: input.tenantId,
        },
        select: {
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          LeaseTenant: {
            select: {
              Lease: true,
            },
          },
        },
      });
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const tenants = await ctx.prisma.tenant.findMany({
      where: {},
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        LeaseTenant: {
          select: {
            Lease: true,
          },
        },
      },
    });
    return tenants;
  }),
});
