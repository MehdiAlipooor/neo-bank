import type { IAuthRepository } from "../../application/ports/IAuthRepository";
import type { User } from "../../domain/entities/User";

export class InMemoryAuthRepo implements IAuthRepository {
	private users: User[] = [];

	async findByEmail(email: string): Promise<User | null> {
		return this.users.find((u) => u.email === email) || null;
	}

	async save(user: User): Promise<void> {
		this.users.push(user);
	}
}
