// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
	// Entry points: API server + workers
	entry: {
		server: "src/server.ts",
		depositWorker:
			"src/modules/transfer/infrastructure/workers/deposit.worker.ts",
		// withdrawalWorker: 'src/modules/transfer/infrastructure/workers/withdrawal.worker.ts', // example
	},
	// Output formats
	format: ["cjs"], // Node.js backend usually CJS
	// Type declarations
	dts: true,
	// Minify output
	minify: true,
	// Source maps for debugging
	sourcemap: true,
	// Output folder
	outDir: "build",
	// Clean the build folder before each build
	clean: true,
	// Exclude large Node dependencies to reduce bundle size
	external: [
		"fastify",
		"@prisma/client",
		"amqplib",
		"bcrypt",
		"dotenv",
		"paseto",
		"path",
	],
	// Target Node version for esbuild
	target: "node20",
	// Bundle each entry separately (default behavior)
	splitting: false, // Only relevant if using ESM, but CJS disables it
});
