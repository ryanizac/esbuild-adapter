import nodemon from "nodemon";
import { checkEmptyObject, importJSON } from "../utils";

export default async function exec() {
  const options = importJSON<nodemon.Settings>("nodemon.json");

  if (checkEmptyObject(options)) {
    console.log(">>> No mon options");
    return;
  }

  const waitStart = new Promise((resolve) => {
    nodemon.on("start", () => {
      console.log(">>> starting nodemon");
      resolve(true);
    });
  });

  nodemon(options);

  await waitStart;
}
