import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const propertyRouter = createTRPCRouter({
  get: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.property.findMany({
      select: {
        name: true,
        streetNumber: true,
        streetName: true,
        city: true,      
        province: true,
        zip: true,
      },
    });
  }),
  post: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        street: z.string().min(1),
        streetName: z.string().min(1),
        zip: z.string().min(1),
        province: z.string().min(1),
        city: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // return ctx.prisma.property.create({
      //   data: {
      //   },
      // });
    }),
});
