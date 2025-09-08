import { CreateWallet } from "../../../wallet/application/use-cases/create-wallet";
import { WalletRepository } from "../../../wallet/infrastructure/repositories/wallet.repository";
import { User } from "../../domain/entities/User";
import { Phone } from "../../domain/value-objects/Phone";
import { Username } from "../../domain/value-objects/Username";
import type { RegisterUserDTO } from "../dto/register-user.dto";
import type { IAuthRepository } from "../ports/IAuthRepository";

const walletRepo = new WalletRepository();

export class RegisterUserUseCase {
	constructor(private readonly authRepo: IAuthRepository) {}

	async execute(dto: RegisterUserDTO): Promise<User> {
		let phone: Phone;
		let username: Username;

		try {
			phone = new Phone(dto.phone);
			username = new Username(dto.username);
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error(`Validation failed: ${error.message}`);
			}
			throw new Error("Validation failed: Unknown error");
		}

		const existing = await this.authRepo.findByPhone(phone.getValue());
		if (existing) {
			throw new Error("User already exists");
		}

		// Step 1: create domain user entity
		const user = User.create(username.getValue(), phone.getValue());

		// Step 2: save user in DB
		await this.authRepo.save(user);

		// Step 3: create wallet for persisted user
		const createWallet = new CreateWallet(walletRepo);
		await createWallet.execute({ userId: user.id });

		return user;
	}
}
