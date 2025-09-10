// import { DEPOSIT_QUEUE, getRabbitChannel } from "../../../../../lib/queue/rabbitMq";

// export class RabbitMqConsumer {
//   constructor(private queue = DEPOSIT_QUEUE) {}

//   /**
//    * Consumes messages safely.
//    * @param onMessage Async callback for message processing.
//    *                  Only receives parsed content.
//    *                  Ack/nack is handled internally.
//    */
//   async consume(
//     onMessage: (msg: { transferId: string }) => Promise<"success" | "retry" | "fail">
//   ) {
//     const ch = await getRabbitChannel();
//     await ch.prefetch(10); // max concurrent messages

//     await ch.consume(
//       this.queue,
//       async (message) => {
//         if (!message) return;

//         try {
//           const content = JSON.parse(message.content.toString()) as { transferId: string };

//           // Execute user callback
//           const result = await onMessage(content);

//           // Handle ack/nack based on result
//           if (result === "success") {
//             ch.ack(message); // processed successfully
//           } else if (result === "retry") {
//             ch.nack(message, false, true); // requeue
//           } else {
//             ch.nack(message, false, false); // send to DLQ
//           }
//         } catch (err) {
//           console.error("Consumer error:", err);
//           // Parsing or processing error → DLQ
//           ch.nack(message, false, false);
//         }
//       },
//       { noAck: false }
//     );

//     console.log(`🐇 RabbitMQ consumer started for queue: ${this.queue}`);
//   }
// }

import {
	DEPOSIT_QUEUE,
	getRabbitChannel,
} from "../../../../../lib/queue/rabbitMq";

export class RabbitMqConsumer {
	constructor(private queue = DEPOSIT_QUEUE) {}

	async consume(
		onMessage: (
			msg: { transferId: string },
			ack: () => void,
			retry: () => void,
		) => Promise<void>,
	) {
		const ch = await getRabbitChannel();
		await ch.prefetch(10);

		await ch.consume(
			this.queue,
			async (message) => {
				if (!message) return;
				const ack = () => ch.ack(message);
				const retry = () => ch.nack(message, false, true);

				try {
					const content = JSON.parse(message.content.toString()) as {
						transferId: string;
					};
					await onMessage(content, ack, retry);
				} catch (err) {
					console.error("Consumer parse error", err);
					ch.nack(message, false, false); // میره به DLQ
				}
			},
			{ noAck: false },
		);
	}
}
