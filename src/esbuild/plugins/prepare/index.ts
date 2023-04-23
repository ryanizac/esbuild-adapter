import { BuildOptions, Plugin } from "esbuild";
import { localPlugins } from "../local";

function extractInitialPlugins(options: BuildOptions): Plugin[] {
  return options.plugins || [];
}

export function preparePlugins(options: BuildOptions): Plugin[] {
  const initialPlugins = extractInitialPlugins(options);
  return [...localPlugins, ...initialPlugins];
}
