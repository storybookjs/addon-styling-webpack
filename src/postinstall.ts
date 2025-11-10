import { spawn } from 'child_process';

const spawnAsync = (
  cmd: Parameters<typeof spawn>[0],
  args: Parameters<typeof spawn>[1],
  options: Parameters<typeof spawn>[2]
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const process = spawn(cmd, args, options);

    process.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });

    process.on('error', (err) => {
      reject(err);
    });
  });
};

type PackageManagers = 'npm' | 'pnpm' | 'yarn1' | 'yarn2';

const PACKAGE_MANAGER_TO_COMMAND: Record<PackageManagers, [string] | [string, string]> = {
  npm: ['npx'],
  pnpm: ['pnpm', 'dlx'],
  yarn1: ['npx'],
  yarn2: ['yarn', 'dlx'],
};

const selectPackageManagerCommand = (packageManager: PackageManagers) => PACKAGE_MANAGER_TO_COMMAND[packageManager];

const spawnPackageManagerScript = async (packageManager: PackageManagers, args: string[]) => {
  const [command, ...baseArgs] = selectPackageManagerCommand(packageManager);

  await spawnAsync(command, [...baseArgs, ...args], {
    stdio: 'inherit',
    cwd: process.cwd(),
    shell: true,
  });
};

const automigrate = async ({ packageManager = 'npm' }: { packageManager: PackageManagers }) => {
  try {
    await spawnPackageManagerScript(packageManager, ['@storybook/auto-config', 'styling']);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

export default automigrate;
