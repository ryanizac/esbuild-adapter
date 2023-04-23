import path from "path";
import fs from "fs";

export function importJSON<T extends object>(name: string): T {
  try {
    const filePath = path.resolve(process.cwd(), name);
    const file = fs.readFileSync(filePath, "utf-8");
    const content = JSON.parse(file) as T;
    return content;
  } catch (error) {
    return {} as T;
  }
}
