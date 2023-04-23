import esbuild from "esbuild";
import { importEsbuildOptions } from "./import-options";
import { preparePlugins } from "./plugins";
import { checkEmptyObject } from "../utils";

export default async function exec() {
  const { watch, ...options } = importEsbuildOptions();

  if (checkEmptyObject(options)) {
    console.log(">>> No build options");
    process.exit(1);
  }

  const ctx = await esbuild.context({
    ...options,
    plugins: preparePlugins(options),
  });

  if (watch) {
    await ctx.watch();
    console.log(">>> esbuild watching");
    return;
  }

  await ctx.dispose();
  await ctx.cancel();
  process.exit();
}
