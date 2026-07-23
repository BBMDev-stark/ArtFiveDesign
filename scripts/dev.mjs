import net from "node:net";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

function isPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.unref();
    server.once("error", () => resolve(false));
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
  });
}

async function findPort() {
  if (process.env.PORT) return Number(process.env.PORT);

  for (let port = 3000; port <= 3010; port += 1) {
    if (await isPortFree(port)) return port;
  }

  throw new Error("Không tìm thấy cổng trống trong khoảng 3000–3010.");
}

const port = await findPort();
const distDir = `.next-dev-${port}`;
const nextCli = path.join(
  projectRoot,
  "node_modules",
  "next",
  "dist",
  "bin",
  "next",
);

console.log(`\nARTFIVE dev: http://localhost:${port}`);
console.log(`Build cache riêng: ${distDir}\n`);

const child = spawn(process.execPath, [nextCli, "dev", "-p", String(port)], {
  cwd: projectRoot,
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_DIST_DIR: distDir,
  },
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}

child.on("exit", (code) => {
  process.exitCode = code ?? 0;
});
