import { importJSON } from "../utils";
import { CompilerOptions } from "./compiler-options";
import { EsbuildOptions } from "./esbuild-options";

export type Options = {
  buildOptions: EsbuildOptions;
} & CompilerOptions.Initial;

export namespace Options {
  async function loadInitialOptions() {
    return importJSON<Options>("esbuild.json");
  }

  function resolveCompilerOptions(
    options: CompilerOptions.Initial
  ): CompilerOptions {
    return {
      watch: options.watch === true,
    };
  }

  function resolve({
    buildOptions,
    ...initialCompilerOptions
  }: Options): [EsbuildOptions, CompilerOptions] {
    const compilerOptions = resolveCompilerOptions(initialCompilerOptions);
    return [buildOptions, compilerOptions];
  }

  export async function load() {
    const json = await loadInitialOptions();
    const options = resolve(json);

    return options;
  }
}
