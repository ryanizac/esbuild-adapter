import { Plugin, PluginBuild } from "esbuild";

export class WatchBuildPlugin implements Plugin {
  readonly name = "watch-build-plugin";

  setup(build: PluginBuild) {
    build.onStart(() => {
      console.log("[watch-build] Start build");
    });

    build.onEnd(() => {
      console.log("[watch-build] End build");
    });
  }
}
