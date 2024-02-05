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
        createdAt: true,
        phone: true,
        LeaseTenant: {
          select: {
            Lease: true,
          },
        },
      },
    });
    return tenants;
  }),
  post: protectedProcedure
    .input(
      z.object({
        avatar: z.any().optional().default(null),
        title: z.enum(["Mr", "Ms", "Dr", "Mrs", "Other"]),
        firstName: z.string().min(1, {
          message: "First name is required",
        }),
        lastName: z.string().min(1, {
          message: "Last name is required",
        }),
        dob: z.date(),
        occupation: z.string().min(1, {
          message: "Occupation is required",
        }),
        email: z.string().optional(),
        phone: z.string().min(1, {
          message: "Phone is required",
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { firstName, lastName, email, phone, avatar } = input;
      console.log("user avatar", avatar);
      return await ctx.prisma.tenant.create({
        data: {
          // avatar: avatar,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          landlordId: ctx.auth.userId as string,
        },
        select: {
          id: true,
        },
      });
    }),
  deleteTenant: protectedProcedure
    .input(
      z.object({
        tenantId: z.string().min(1, {
          message: "tenant id is required",
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { tenantId } = input;
      return await ctx.prisma.tenant.delete({
        where: {
          id: tenantId,
          landlordId: ctx.auth.userId as string,
        },
        select: {
          id: true,
        },
      });
    }),
});
