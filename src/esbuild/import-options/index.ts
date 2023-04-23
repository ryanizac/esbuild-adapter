import { BuildOptions } from "esbuild";
import { importJSON } from "../../utils";

type LocalOptions = {
  watch?: boolean;
};

type ExpectedOptions = BuildOptions & LocalOptions;

const filenameOptions = "esbuild.json";

export function importEsbuildOptions() {
  return importJSON<ExpectedOptions>(filenameOptions);
}
