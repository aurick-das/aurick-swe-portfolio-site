import { z } from "zod";

const optionalUrlFromEnv = z.preprocess((value) => {
  if (value === "") {
    return undefined;
  }
  return value;
}, z.string().url().optional());

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: optionalUrlFromEnv,
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});
