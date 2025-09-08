// // import "dotenv/config";
// import { pollLoop } from "./modules/wallet/infrastructure/workers/outboxWorker";
// import prisma from "../lib/db/prisma";

// async function bootstrap() {
// 	console.log("Starting app...");
// 	pollLoop().catch((e) => {
// 		console.error(e);
// 		process.exit(1);
// 	});

// 	// seed demo user/wallet if none
// 	const user = await prisma.user.upsert({
// 		where: { phone: "09199784100", username: "mehdi" },
// 		update: {},
// 		create: { phone: "09199784100", username: "mehdi" },
// 	});

// 	const wallet = await prisma.wallet.findFirst({ where: { userId: user.id } });
// 	// if (!wallet) {
// 	//   wallet = await prisma.wallet.create({ data: { userId: user.id }});
// 	//   // seed via ledger transaction
// 	//   await prisma.ledgerTransaction.create({
// 	//     data: {
// 	//       type: "SEED",
// 	//       ledgerEntries: {
// 	//         create: [
// 	//           { walletId: wallet.id, account: "WALLET", amount: BigInt(30_000_000) },
// 	//           { walletId: null, account: "SYSTEM", amount: BigInt(-30_000_000) }
// 	//         ]
// 	//       }
// 	//     }
// 	//   });
// 	// }

// 	console.log("Demo wallet ready", wallet.id);
// }

// bootstrap().catch((e) => {
// 	console.error(e);
// 	process.exit(1);
// });

export {};
