import { Email } from "../../domain/value-objects/Email";
import type { FindUserDto } from "../dto/find-user.dto";
import type { IAuthRepository } from "../ports/IAuthRepository";

export class FindUserUseCase {
	constructor(private readonly repo: IAuthRepository) {}

	async execute(dto: FindUserDto) {
		const email = new Email(dto.email);
		const user = this.repo.findByEmail(email.getValue());

		return user;
	}
}
