import type { RefreshToken } from "../../domain/entities/RefreshToken";
import type { User } from "../../domain/entities/User";

export interface IAuthRepository {
	findByPhone(phone: string): Promise<User | null>;
	save(user: User): Promise<void>;

	saveRefreshToken(rt: RefreshToken): Promise<void>;
	findRefreshToken(token: string): Promise<RefreshToken | null>;
	deleteRefreshToken(token: string): Promise<void>;
}
