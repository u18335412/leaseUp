import { leaseRouter } from "./routers/lease";
import { propertyRouter } from "./routers/property";
import { tenantRouter } from "./routers/tenant";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  healthcheck: publicProcedure.query(() => {
    return "yay";
  }),
  property: propertyRouter,
  tenant: tenantRouter,
  lease: leaseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
