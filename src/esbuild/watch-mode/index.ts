import { BuildOptions, context } from "esbuild";

export async function watchMode(options: BuildOptions) {
  const ctx = await context(options);
  await ctx.watch();

  return ctx;
}
