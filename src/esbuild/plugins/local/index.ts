import { Plugin } from "esbuild";
import { WatchBuildPlugin } from "../watch-build";

export const localPlugins: Plugin[] = [WatchBuildPlugin];
