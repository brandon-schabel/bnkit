import fs from "fs";
import path from "path";

export const getFilesForDirectory = (
  directory: "_apps" | "_tests" | "_docs" | "." | "../" | ".../" | string,
  { ignoreFiles: ignoreFiles = [] }: { ignoreFiles?: string[] } = {}
) => {
  const appFiles = fs
    .readdirSync(directory)
    // remove the extension
    .map((filename) => path.join(directory, filename))
    .map((filename) => path.parse(filename).name);

  return appFiles.filter((filename) => !ignoreFiles.includes(filename));
};

export const getFilesForDirectoryFromRoot = (
  directory: "_apps" | "_tests" | "_docs" | "." | "../" | ".../" | string,
  { ignoreFiles: ignoreFiles = [] }: { ignoreFiles?: string[] } = {}
) => {
  const rootPath = findAppRoot(process.cwd()) || ".";
  const targetDirectory = path.join(rootPath, directory);

  console.log(rootPath, targetDirectory);
  return getFilesForDirectory(targetDirectory, { ignoreFiles });
};

export function isRootFolder(folderPath: string): boolean {
  // Add conditions to identify your project root (e.g., presence of package.json, .git folder, etc.)
  return fs.existsSync(path.join(folderPath, "tsconfig.json"));
}

export function findAppRoot(startingPath: string): string | null {
  let currentPath = startingPath;

  while (!isRootFolder(currentPath)) {
    const parentPath = path.dirname(currentPath);

    if (parentPath === currentPath) {
      return null; // We've reached the filesystem root and haven't found the app root
    }

    currentPath = parentPath;
  }

  return currentPath;
}

export const saveResultToFile = async (filePath: string, content: string) => {
  try {
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    await fs.promises.writeFile(filePath, content);
  } catch (err) {
    console.error(`Failed to save result to ${filePath}: ${err.message}`);
  }
};

export const readFilesContents = (filePaths: string[]) => {
  return filePaths.map((filePath) => {
    const filename = path.basename(filePath);
    const content = fs.readFileSync(filePath, "utf8");
    return { path: filename, content };
  });
};