import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import os from 'os';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function getCpuTimes() {
  const cpus = os.cpus();
  let idle = 0;
  let total = 0;
  for (const cpu of cpus) {
    for (const type of Object.keys(cpu.times) as Array<keyof typeof cpu.times>) {
      total += cpu.times[type];
    }
    idle += cpu.times.idle;
  }
  return {idle, total};
}

let prevCpu = getCpuTimes();
let lastCpuPercent = 0;

function sampleCpuPercent(): number {
  const current = getCpuTimes();
  const idleDiff = current.idle - prevCpu.idle;
  const totalDiff = current.total - prevCpu.total;
  prevCpu = current;
  if (totalDiff > 0) {
    lastCpuPercent = Math.max(1, Math.min(100, Math.round((1 - idleDiff / totalDiff) * 100)));
  }
  return lastCpuPercent;
}

function systemTelemetryPlugin(): Plugin {
  return {
    name: 'sentinel-system-telemetry',
    configureServer(server) {
      server.middlewares.use('/api/system', (_req, res) => {
        const cpus = os.cpus();
        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        const usedMem = totalMem - freeMem;
        const cpuPercent = sampleCpuPercent();

        const nets = os.networkInterfaces();
        const lanIps: string[] = [];
        for (const name of Object.keys(nets)) {
          for (const net of nets[name] || []) {
            if (net.family === 'IPv4' && !net.internal) {
              lanIps.push(net.address);
            }
          }
        }

        const payload = {
          cpuPercent,
          cpuCores: cpus.length,
          cpuModel: cpus[0]?.model?.trim() || os.arch(),
          arch: os.arch(),
          platform: os.platform(),
          hostname: os.hostname(),
          lanIps,
          totalMemGb: Number((totalMem / (1024 ** 3)).toFixed(1)),
          usedMemGb: Number((usedMem / (1024 ** 3)).toFixed(1)),
          memPercent: Math.round((usedMem / totalMem) * 100),
          uptimeSeconds: Math.floor(os.uptime()),
          timestamp: Date.now(),
        };

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-store');
        res.end(JSON.stringify(payload));
      });

      server.middlewares.use('/api/kiwix-search', async (req, res) => {
        try {
          const urlObj = new URL(req.url || '', 'http://localhost');
          const q = urlObj.searchParams.get('q') || '';
          const lang = urlObj.searchParams.get('lang') || 'fra';
          const count = urlObj.searchParams.get('count') || '24';

          const target = new URL('https://library.kiwix.org/catalog/v2/entries');
          target.searchParams.set('count', count);
          if (lang && lang !== 'all') target.searchParams.set('lang', lang);
          if (q.trim()) target.searchParams.set('q', q.trim());

          const upstream = await fetch(target.toString(), {
            headers: { 'User-Agent': 'Sentinel-Pack-Survie/2.0' },
          });
          const xml = await upstream.text();

          const entries: Array<{
            id: string;
            title: string;
            summary: string;
            language: string;
            updated: string;
            sizeMb: number;
            downloadUrl: string;
          }> = [];

          const entryMatches = xml.match(/<entry>[\s\S]*?<\/entry>/g) || [];
          for (const block of entryMatches) {
            const id = (block.match(/<id>([\s\S]*?)<\/id>/)?.[1] || '').trim();
            const title = (block.match(/<title>([\s\S]*?)<\/title>/)?.[1] || '').trim();
            const summary = (block.match(/<summary>([\s\S]*?)<\/summary>/)?.[1] || '').trim();
            const language = (block.match(/<language>([\s\S]*?)<\/language>/)?.[1] || lang).trim();
            const updated = (block.match(/<updated>([\s\S]*?)<\/updated>/)?.[1] || '').slice(0, 10);

            const acqMatch =
              block.match(/<link[^>]*rel="http:\/\/opds-spec\.org\/acquisition\/open-access"[^>]*>/) ||
              block.match(/<link[^>]*href="[^"]+\.zim(\.meta4)?"[^>]*>/);
            const tag = acqMatch ? acqMatch[0] : '';
            const rawHref = tag.match(/href="([^"]+)"/)?.[1] || '';
            const lengthBytes = Number(tag.match(/length="(\d+)"/)?.[1] || '0');
            const downloadUrl = rawHref.replace(/\.meta4$/, '');
            const sizeMb = lengthBytes > 0 ? Math.max(1, Math.round(lengthBytes / (1024 * 1024))) : 0;

            if (title && downloadUrl) {
              entries.push({
                id: id || title,
                title,
                summary,
                language,
                updated,
                sizeMb,
                downloadUrl,
              });
            }
          }

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ entries }));
        } catch (err: any) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ entries: [], error: err?.message || 'Offline' }));
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), systemTelemetryPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
