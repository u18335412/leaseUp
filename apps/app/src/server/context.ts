/* eslint-disable @typescript-eslint/no-unused-vars */
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import {
  getAuth,
  SignedInAuthObject,
  SignedOutAuthObject,
} from '@clerk/nextjs/server';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateContextOptions {
  auth: SignedInAuthObject | SignedOutAuthObject;
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner({ auth }: CreateContextOptions) {
  return {
    auth,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(
  opts: trpcNext.CreateNextContextOptions,
): Promise<Context> {
  // for API-response caching see https://trpc.io/docs/caching

  return await createContextInner({ auth: getAuth(opts.req) });
}
