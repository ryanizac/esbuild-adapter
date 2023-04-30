import { BuildOptions, build, context } from "esbuild";

export class Esbuild {
  options: BuildOptions;

  constructor(initialOptions: BuildOptions) {
    this.options = initialOptions;
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
