import { Plugin, PluginBuild } from "esbuild";
import { EsbuildPlugin } from "../shared";
import { StageObserver } from "./ports";

@EsbuildPlugin
export class WatchBuildPlugin implements Plugin {
  readonly name = "watch-build-plugin";

  private wasBuilt: boolean = false;

  constructor(private stageObserver: StageObserver) {}

  setup(build: PluginBuild) {
    build.onEnd(() => {
      if (this.wasBuilt) {
        this.stageObserver.emit("rebuild");
        return;
      }

      this.stageObserver.emit("build");
      this.wasBuilt = true;
    });
  }
}
