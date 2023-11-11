import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const leaseRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(
      z.object({
        leaseId: z.string().min(1, {
          message: "lease id is required",
        }),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.lease.findFirstOrThrow({
        where: {
          id: input.leaseId,
        },
        select: {
          id: true,
          Unit: true,
          startDate: true,
          endDate: true,
          isActive: true,
        },
      });
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.lease.findMany({
      where: {},
      select: {
        id: true,
      },
    });
  }),
});
