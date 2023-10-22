import type { NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import type { AnyRouter } from "@trpc/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/routers/_app";

const handler = (req: NextRequest) => {
  void fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter as AnyRouter,
    createContext: () => ({
      auth: getAuth(req),
    }),
  });
};

export { handler as GET, handler as POST };
