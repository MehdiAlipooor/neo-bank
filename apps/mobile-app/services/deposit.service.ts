import { fetcher } from "@/lib/api/fetcher";

export async function initDeposit() {
	return await fetcher<any>("transfer/internalw", {
		method: "post",
		body: JSON.stringify({
			sourceWalletId: "4a74947f-08ce-426a-872e-3381ca4b132f",
			destWalletId: "53cedeb1-d4ff-408a-b322-1400d2274759",
			amount: "140",
			idempotencyKey: new Date(),
		}),
	});
}
