import * as esbuild from "../esbuild";
import { Options } from "../options";
import { checkEmptyObject } from "../utils";

async function main() {
  const [buildOptions, compilerOptions] = await Options.load();

  if (checkEmptyObject(buildOptions)) {
    console.log("[compiler] no build options");
    process.exit(1);
  }

  if (!compilerOptions.watch) {
    await esbuild.pureBuild(buildOptions);
    console.log("[compiler] Build complete");
    console.log("[compiler] Closing compiler");
    process.exit();
  }

  await esbuild.watchMode(buildOptions);
  console.log("[compiler] Build complete");
  console.log("[compiler] Watching changes");
}

main();
