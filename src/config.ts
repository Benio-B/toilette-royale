import { z } from 'zod';

// TODO add test
const envSchema = z
  .object({
    VITE_JSONBIN_USE: z.enum(['true', 'false']).transform(value => value === 'true').default('false'),
    VITE_JSONBIN_ROOT_URL: z.string().url().default('https://api.jsonbin.io/v3'),
    VITE_JSONBIN_MASTER_KEY: z.string().optional(),
    VITE_JSONBIN_ACCESS_KEY: z.string().optional(),
    VITE_JSONBIN_ID: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.VITE_JSONBIN_USE && data.VITE_JSONBIN_MASTER_KEY === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '`VITE_JSONBIN_MASTER_KEY` is required when `VITE_JSONBIN_USE` is true',
        path: ['VITE_JSONBIN_MASTER_KEY'],
      });
    }
    if (data.VITE_JSONBIN_USE && data.VITE_JSONBIN_ACCESS_KEY === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '`VITE_JSONBIN_ACCESS_KEY` is required when `VITE_JSONBIN_USE` is true',
        path: ['VITE_JSONBIN_ACCESS_KEY'],
      });
    }
    if (data.VITE_JSONBIN_USE && data.VITE_JSONBIN_ID === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '`VITE_JSONBIN_ID` is required when `VITE_JSONBIN_USE` is true',
        path: ['VITE_JSONBIN_ID'],
      });
    }
  });

const config = envSchema.parse(import.meta.env);

export { config };
