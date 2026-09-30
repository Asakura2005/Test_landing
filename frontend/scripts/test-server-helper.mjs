import fs from 'fs';
import path from 'path';
import http from 'http';
import { spawn, execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

/**
 * Locate Edge or Chrome executable across Windows, Mac, and Linux
 */
export function findBrowserPath() {
  const envCandidates = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    process.env.EDGE_PATH,
    process.env.CHROME_PATH,
  ].filter(Boolean);

  for (const p of envCandidates) {
    if (fs.existsSync(p)) return p;
  }

  const userProfile = process.env.USERPROFILE || '';
  const localAppData = process.env.LOCALAPPDATA || '';

  const candidates = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    path.join(localAppData, 'Microsoft\\Edge\\Application\\msedge.exe'),
    path.join(localAppData, 'Google\\Chrome\\Application\\chrome.exe'),
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  throw new Error('Could not find a valid Chrome or Edge browser executable. Please set EDGE_PATH or PUPPETEER_EXECUTABLE_PATH.');
}

/**
 * Check if HTTP port responds
 */
export function isPortResponding(port = 4173, host = 'localhost') {
  return new Promise((resolve) => {
    const req = http.get({ host, port, path: '/', timeout: 1500 }, (res) => {
      res.resume();
      resolve(true);
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
  });
}

/**
 * Ensure Vite preview server is running on the target port
 */
export async function ensurePreviewServer(port = 4173) {
  const isRunning = await isPortResponding(port);
  if (isRunning) {
    console.log(`[TestServer] Server already running at http://localhost:${port}`);
    return () => {}; // No-op cleanup
  }

  // Check if dist folder exists
  const distPath = path.join(ROOT_DIR, 'dist', 'index.html');
  if (!fs.existsSync(distPath)) {
    console.log('[TestServer] dist/index.html not found. Running npm run build...');
    execSync('npm run build', { cwd: ROOT_DIR, stdio: 'inherit' });
  }

  console.log(`[TestServer] Spawning Vite preview on port ${port}...`);
  const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const serverProcess = spawn(npxCmd, ['vite', 'preview', '--port', String(port), '--host', 'localhost'], {
    cwd: ROOT_DIR,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true,
  });

  serverProcess.stdout?.on('data', (d) => {
    // console.log(`[Vite stdout] ${d.toString().trim()}`);
  });
  serverProcess.stderr?.on('data', (d) => {
    // console.error(`[Vite stderr] ${d.toString().trim()}`);
  });

  // Cleanup helper
  const stopServer = () => {
    if (!serverProcess || serverProcess.killed) return;
    try {
      console.log(`[TestServer] Stopping Vite preview server (pid: ${serverProcess.pid})...`);
      if (process.platform === 'win32') {
        execSync(`taskkill /pid ${serverProcess.pid} /T /F`, { stdio: 'ignore' });
      } else {
        serverProcess.kill('SIGTERM');
      }
    } catch {
      // ignore
    }
  };

  // Register clean shutdown
  process.on('exit', stopServer);
  process.on('SIGINT', () => { stopServer(); process.exit(1); });
  process.on('SIGTERM', () => { stopServer(); process.exit(1); });

  // Poll until server is responding
  const startTime = Date.now();
  const timeoutMs = 20000;
  while (Date.now() - startTime < timeoutMs) {
    const ready = await isPortResponding(port);
    if (ready) {
      console.log(`[TestServer] Server ready at http://localhost:${port} in ${Date.now() - startTime}ms`);
      return stopServer;
    }
    await new Promise((r) => setTimeout(r, 400));
  }

  stopServer();
  throw new Error(`Timed out waiting for Vite preview server on port ${port}`);
}
