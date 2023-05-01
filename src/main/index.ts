import { Esbuild } from "../esbuild";
import { Options } from "../options";
import { WatchBuildPlugin } from "../plugins";
import { StageObserver } from "../stage";
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

  private static preapreStageLogs(stageObserver: StageObserver) {
    stageObserver.on("start", () => {
      console.log("[compiler] Start");
    });

    stageObserver.on("build", () => {
      console.log("[compiler] Building");
    });

    stageObserver.on("rebuild", () => {
      console.log("[compiler] Rebuilding");
    });

    stageObserver.on("watch", () => {
      console.log("[compiler] Watching changes");
    });
  }

  static async main() {
    const [buildOptions, compilerOptions] = await this.loadOptions();
    const stageObserver = new StageObserver();
    const esbuild = new Esbuild(buildOptions);

    esbuild.addPlugin(WatchBuildPlugin);

    this.preapreStageLogs(stageObserver);

    stageObserver.emit("start");

    if (!compilerOptions.watch) {
      await esbuild.pureBuild();
      stageObserver.emit("build");
      process.exit();
    }

    await esbuild.watchMode();
    stageObserver.emit("watch");
  }
}

Application.main();
