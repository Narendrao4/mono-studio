import { readdir, readFile, writeFile } from "node:fs/promises";

const directory = new URL("../src/components/ui/", import.meta.url);
const files = (await readdir(directory)).filter((file) => file.endsWith(".tsx")).sort();
const sources = Object.fromEntries(await Promise.all(files.map(async (file) => [
  file,
  await readFile(new URL(file, directory), "utf8"),
])));

await writeFile(
  new URL("../src/data/component-sources.json", import.meta.url),
  JSON.stringify(sources, null, 2) + "\n",
  "utf8",
);
console.log(`Synced ${files.length} component sources for documentation.`);
