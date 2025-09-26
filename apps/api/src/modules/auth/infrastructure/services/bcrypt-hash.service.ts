import bcrypt from "bcrypt";
import type { IHashService } from "../../application/ports/IHashService";

export class BcryptHashService implements IHashService {
	async hash(data: string): Promise<string> {
		return bcrypt.hash(data, 10);
	}

	async compare(data: string, hash: string): Promise<boolean> {
		return bcrypt.compare(data, hash);
	}
}
