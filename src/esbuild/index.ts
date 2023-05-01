import { BuildOptions, Plugin, build, context } from "esbuild";

export class Esbuild {
  private readonly options: BuildOptions;

  constructor({ plugins: initialPlugins, ...initialOptions }: BuildOptions) {
    const options = Esbuild.prepareOptions(initialOptions);

    this.options = options;
  }

  private static prepareOptions(initialOptions: BuildOptions): BuildOptions {
    return {
      ...initialOptions,
      plugins: initialOptions.plugins || [],
    };
  }

  addPlugin(...plugins: Plugin[]) {
    this.options.plugins?.push(...plugins);
  }

  async pureBuild() {
    const options = this.options;
    const result = await build(options);
    return result;
  }

  async watchMode() {
    const options = this.options;
    const ctx = await context(options);
    await ctx.watch();
  }
}
