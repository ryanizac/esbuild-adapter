import { importEsbuildOptions } from "./import-options";
import { preparePlugins } from "./plugins";
import { checkEmptyObject } from "../utils";
import { watchMode } from "./watch-mode";
import { pureBuild } from "./pure-build";

export default async function exec() {
  const { watch, ...initialOptions } = importEsbuildOptions();

  if (checkEmptyObject(initialOptions)) {
    console.log(">>> No build options");
    process.exit(1);
  }

  const options = {
    ...initialOptions,
    plugins: preparePlugins(initialOptions),
  };

  if (watch) {
    await watchMode(options);
    console.log(">>> esbuild watching");
    return;
  }

  await pureBuild(options);
  console.log(">>> build complete");
}
