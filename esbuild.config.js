const path = require("path")
const rails = require("esbuild-rails")

const isProduction = process.env.RAILS_ENV === "production"

require("esbuild")
  .context({
    entryPoints: ["application.js"],
    bundle: true,
    outdir: path.join(process.cwd(), "app/assets/builds"),
    absWorkingDir: path.join(process.cwd(), "app/javascript"),
    sourcemap: !isProduction,
    minify: isProduction,
    target: ["es2015"],
    watch: process.argv.includes("--watch"),
    loader: {
      ".js": "jsx",
      ".tsx": "tsx",
      ".ts": "tsx",
    },
    drop: isProduction ? ["console", "debugger"] : [],
    plugins: [rails()],
    splitting: true,
    format: "esm",
    chunkNames: "[name]-[hash]",
  })
  .then((context) => {
    if (process.argv.includes("--watch")) {
      context.watch()
    } else {
      context.rebuild().then((result) => {
        context.dispose()
      })
    }
  })
  .catch(() => process.exit(1))
