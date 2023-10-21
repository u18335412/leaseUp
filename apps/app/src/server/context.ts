import type {
  SignedInAuthObject,
  SignedOutAuthObject,
} from '@clerk/nextjs/server';
import { getAuth } from '@clerk/nextjs/server';
import type * as trpc from '@trpc/server';
import type * as trpcNext from '@trpc/server/adapters/next';

interface CreateContextOptions {
  auth: SignedInAuthObject | SignedOutAuthObject;
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
// eslint-disable-next-line @typescript-eslint/require-await -- This is fine.
export async function createContextInner({ auth }: CreateContextOptions) {
  return {
    auth,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

/**
 * Creates context for an incoming request
 * {@link https://trpc.io/docs/context}
 */
export async function createContext(
  opts: trpcNext.CreateNextContextOptions,
): Promise<Context> {
  // for API-response caching see https://trpc.io/docs/caching

  return createContextInner({
    auth: getAuth(opts.req),
  });
}
