import "dotenv/config";
import Fastify from "fastify";
import { authModule } from "./modules/auth/auth.module";
import { transferModule } from "./modules/transfer/transfer.module";
import { walletModule } from "./modules/wallet/wallet.module";

const app = Fastify({ logger: true });

const port = (process.env.PORT || 7000) as number;

app.register(authModule);
app.register(walletModule);
app.register(transferModule);

async function start() {
	try {
		await app.listen({ port: port });
		console.log(`Server listening at http://localhost:${port}`);
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
}

start();
