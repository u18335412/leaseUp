import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { propertyRouter } from "./routers/property";

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
});

// export type definition of API
export type AppRouter = typeof appRouter;
