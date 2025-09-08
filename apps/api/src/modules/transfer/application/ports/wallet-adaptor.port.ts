import { Money } from "../../../wallet/domain/value-objects/Money";
import { WalletDTO } from "../../domain/dtos/wallet.dto";

export interface IWalletAdaptor {
	findByUserId(userId: string): Promise<WalletDTO | null>;
	findById(id: string): Promise<WalletDTO | null>;
	credit(walletId: string, amount: Money): Promise<void>;
	ebit(walletId: string, amount: Money): Promise<void>;
}
