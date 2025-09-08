import type { Wallet } from "../../domain/entities/wallet";

// export class WalletMapper {
// 	static toDTO(wallet: Wallet): WalletResponseDTO {
// 		return {
// 			id: wallet.id,
// 			userId: wallet.userId,
// 			balance: wallet.getBalance(),
// 		};
// 	}
// }

export function WalletToDtoMapper(wallet: Wallet) {
	return {
		id: wallet.id,
		userId: wallet.userId,
		balance: wallet.getBalance(),
	};
}
