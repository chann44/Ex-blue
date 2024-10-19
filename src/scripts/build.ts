// import { build } from "esbuild";

// build({
//   entryPoints: ["./src/cmd/main.ts"], // Entry point of your app
//   bundle: true, // Bundle everything into a single file
//   platform: "node", // Target Node.js environment
//   target: "es2017", // JavaScript target version
//   outdir: "dist", // Output folder
//   minify: true, // Minify for production
//   sourcemap: false, // No sourcemaps
//   external: ["@types/*"], // Ignore type-only dependencies
//   logLevel: "info",
// }).catch(() => process.exit(1));

import { build } from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";

build({
  entryPoints: ["./src/cmd/main.ts"],
  bundle: true,
  platform: "node",
  target: "node14",
  outfile: "dist/bundle.js",
  minify: true,
  sourcemap: false,
  plugins: [
    nodeExternalsPlugin({
      allowList: [], // This forces inclusion of ALL node_modules
    }),
  ],
  logLevel: "info",
  format: "cjs",
  banner: {
    js: "#!/usr/bin/env node",
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
}).catch(() => process.exit(1));
