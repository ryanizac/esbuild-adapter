import { Esbuild } from "../esbuild";
import { Options } from "../options";
import { WatchBuildPlugin } from "../plugins";
import * as utils from "../utils";

class Application {
  private static async loadOptions() {
    const options = await Options.load();
    const buildOptions = options[0];

    if (utils.checkEmptyObject(buildOptions)) {
      console.log("[compiler] no build options");
      process.exit(1);
    }

    return options;
  }

  static async main() {
    const [buildOptions, compilerOptions] = await this.loadOptions();
    const esbuild = new Esbuild(buildOptions);

    esbuild.addPlugin(WatchBuildPlugin);

    if (!compilerOptions.watch) {
      await esbuild.pureBuild();
      console.log("[compiler] Closing compiler");
      process.exit();
    }

    await esbuild.watchMode();
    console.log("[compiler] Watching changes");
  }
}

Application.main();
