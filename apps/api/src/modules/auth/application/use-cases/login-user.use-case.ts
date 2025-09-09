import { CreateWallet } from "../../../wallet/application/use-cases/create-wallet";
import { WalletRepository } from "../../../wallet/infrastructure/repositories/wallet.repository";
import { User } from "../../domain/entities/User";
import { Phone } from "../../domain/value-objects/Phone";
import type { IAuthRepository } from "../ports/IAuthRepository";
import type { IssueTokensUseCase } from "./issue-token.use-case";

const walletRepo = new WalletRepository();

export class LoginUserUseCase {
	constructor(
		private readonly authRepo: IAuthRepository,
		private readonly issueTokenUseCase: IssueTokensUseCase,
	) {}

	async execute(
		dto: any,
	): Promise<{ user: User; accessToken: string; refreshToken: string }> {
		let phone: Phone;
		const username = dto.username;

		try {
			phone = new Phone(dto.phone);
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error(`Validation failed: ${error.message}`);
			}
			throw new Error("Validation failed: Unknown error");
		}

		let user = (await this.authRepo.findByPhone(
			phone.getValue(),
		)) as unknown as User;

		/**
		 * @description If no user, the user will be generated, and an empty wallet will be generated too
		 */
		if (!user) {
			const userSchema = User.create(username, phone.getValue());
			await this.authRepo.save(userSchema);
			user = userSchema as User;

			// Step 3: create wallet for persisted user
			const createWallet = new CreateWallet(walletRepo);
			await createWallet.execute({ userId: user.id });
		}

		const tokens = await this.issueTokenUseCase.execute((user as User)?.id);

		return {
			user,
			accessToken: tokens.accessToken,
			refreshToken: tokens.refreshToken,
		};
	}
}
