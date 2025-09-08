import { Wallet } from "../../../wallet/domain/entities/wallet";
import { WalletDTO } from "../../domain/dtos/wallet.dto";

type WalletToDto = (input: any) => WalletDTO;
export const walletToDto: WalletToDto = (input) => {
	return {
		id: input.id,
		userId: input.userId,
		balance: input.balance.value,
		cardNumber: input.cardNumber,
		accountNumber: input.accountNumber,
		shabaNumber: input.shabaNumber,
		isRemoved: input.isRemoved,
	};
};
