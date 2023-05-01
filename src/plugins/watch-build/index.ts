import { Plugin } from "esbuild";

export const WatchBuildPlugin: Plugin = {
  name: "watch-build-plugin",
  setup(build) {
    build.onStart(() => {
      console.log(">>> [watch] Start build");
    });

    build.onEnd(() => {
      console.log(">>> [watch] End build");
    });
  },
};
