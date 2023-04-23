import esbuild from "../esbuild";
import nodemon from "../nodemon";

async function main() {
  await esbuild();
  await nodemon();
}

main();
