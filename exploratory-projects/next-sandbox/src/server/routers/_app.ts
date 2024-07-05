import { z } from 'zod';
import { procedure, router } from '../trpc';
import { components } from '../../../petstore';

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  goodbye: procedure
    .query(async (): Promise<components["schemas"]["Pet"]> => {
      const result = await fetch("https://petstore3.swagger.io/api/v3/pet/1");
      const data = result.json();

      return data;
    })
});

// export type definition of API
export type AppRouter = typeof appRouter;