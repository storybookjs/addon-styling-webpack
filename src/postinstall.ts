import { spawn } from "child_process";

type PackageManagers = "npm" | "pnpm" | "yarn1" | "yarn2";

const PACKAGE_MANAGER_TO_COMMAND: Record<PackageManagers, string> = {
  npm: "npx",
  pnpm: "pnpm dlx",
  yarn1: "npx",
  yarn2: "yarn dlx",
};

const automigrate = async (packageManager: PackageManagers) => {
  const command = PACKAGE_MANAGER_TO_COMMAND[packageManager];
  await spawn(command, ["@storybook/auto-config", "styling"], {
    stdio: "inherit",
    cwd: process.cwd(),
  });
};

export default automigrate;
