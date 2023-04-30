import { BuildOptions, build } from "esbuild";

export async function pureBuild(options: BuildOptions) {
  const result = await build(options);

  return result;
}
