import { spawn } from "child_process";

type PackageManagers = "npm" | "pnpm" | "yarn1" | "yarn2";

const PACKAGE_MANAGER_TO_COMMAND: Record<PackageManagers, string[]> = {
  npm: ["npx"],
  pnpm: ["pnpm", "dlx"],
  yarn1: ["npx"],
  yarn2: ["yarn", "dlx"],
};

const selectPackageManagerCommand = (
  packageManager: PackageManagers
): string[] => PACKAGE_MANAGER_TO_COMMAND[packageManager];

const spawnPackageManagerScript = async (
  packageManager: PackageManagers,
  args: string[]
) => {
  const [command, ...baseArgs] = selectPackageManagerCommand(packageManager);

  await spawn(command, [...baseArgs, ...args], {
    stdio: "inherit",
    cwd: process.cwd(),
    shell: true,
  });
};

const automigrate = async ({
  packageManager = "npm",
}: {
  packageManager: PackageManagers;
}) => {
  try {
    await spawnPackageManagerScript(packageManager, [
      "@storybook/auto-config",
      "styling",
    ]);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

export default automigrate;
