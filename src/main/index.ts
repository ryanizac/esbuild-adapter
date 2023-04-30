import { Esbuild } from "../esbuild";
import { Options } from "../options";
import * as utils from "../utils";

async function main() {
  const [buildOptions, compilerOptions] = await Options.load();

  if (utils.checkEmptyObject(buildOptions)) {
    console.log("[compiler] no build options");
    process.exit(1);
  }

  const esbuild = new Esbuild(buildOptions);

  if (!compilerOptions.watch) {
    await esbuild.pureBuild();
    console.log("[compiler] Build complete");
    console.log("[compiler] Closing compiler");
    process.exit();
  }

  await esbuild.watchMode();
  console.log("[compiler] Build complete");
  console.log("[compiler] Watching changes");
}

main();
