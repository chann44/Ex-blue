import { build } from "esbuild";

build({
  entryPoints: ["./src/cmd/main.ts"], // Entry point of your app
  bundle: true, // Bundle everything into a single file
  platform: "node", // Target Node.js environment
  target: "es2017", // JavaScript target version
  outdir: "dist", // Output folder
  minify: true, // Minify for production
  sourcemap: false, // No sourcemaps
  external: ["@types/*"], // Ignore type-only dependencies
  logLevel: "info",
}).catch(() => process.exit(1));
