"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletToDtoMapper = WalletToDtoMapper;
// export class WalletMapper {
// 	static toDTO(wallet: Wallet): WalletResponseDTO {
// 		return {
// 			id: wallet.id,
// 			userId: wallet.userId,
// 			balance: wallet.getBalance(),
// 		};
// 	}
// }
function WalletToDtoMapper(wallet) {
    return {
        id: wallet.id,
        userId: wallet.userId,
        balance: wallet.getBalance(),
    };
}
