import { existsSync } from "node:fs";
import path from "node:path";

import { config as loadDotenv } from "dotenv";

export function loadEnv() {
  const requestedPath = process.env.DOTENV_CONFIG_PATH;

  if (!requestedPath) {
    loadDotenv({ override: true });
    return;
  }

  const resolvedPath = resolveEnvPath(requestedPath);

  if (!resolvedPath) {
    throw new Error(`Could not find env file: ${requestedPath}`);
  }

  loadDotenv({
    path: resolvedPath,
    override: true
  });
}

function resolveEnvPath(requestedPath: string): string | null {
  if (path.isAbsolute(requestedPath)) {
    return existsSync(requestedPath) ? requestedPath : null;
  }

  let currentDirectory = process.cwd();

  while (true) {
    const candidate = path.resolve(currentDirectory, requestedPath);

    if (existsSync(candidate)) {
      return candidate;
    }

    const parentDirectory = path.dirname(currentDirectory);

    if (parentDirectory === currentDirectory) {
      return null;
    }

    currentDirectory = parentDirectory;
  }
}
