import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server/routers/_app';
import { getAuth } from '@clerk/nextjs/server';

import { NextRequest } from 'next/server';

const handler = (req: NextRequest) => {
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({
      auth: getAuth(req),
    }),
  });
};

export { handler as GET, handler as POST };
