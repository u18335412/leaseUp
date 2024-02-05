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
  getAllTenants: protectedProcedure.query(async ({ ctx }) => {
    const tenants = await ctx.prisma.tenant.findMany({
      where: {
        landlordId: ctx.auth.userId as string,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      data: tenants,
    };
  }),
  getAllProperties: protectedProcedure.query(async ({ ctx }) => {
    const properties = await ctx.prisma.property.findMany({
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
      },
    });

    return {
      data: properties,
    };
  }),
  getAllUnits: protectedProcedure
    .input(
      z.string().min(1, {
        message: "property id is required",
      }),
    )
    .query(async ({ ctx, input }) => {
      const units = await ctx.prisma.unit.findMany({
        where: {
          propertyId: input,
        },
        select: {
          id: true,
          name: true,
          bedrooms: true,
          bathrooms: true,
          rent: true,
        },
      });

      return {
        data: units,
      };
    }),
});
