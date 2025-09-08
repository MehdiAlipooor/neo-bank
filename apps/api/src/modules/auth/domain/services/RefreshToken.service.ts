import { V4 } from "paseto";
import { RefreshToken } from "../entities/RefreshToken";

async function generateLocalKey() {
	const key = await V4.generateKey("public");
	return key;
}

export class TokenService {
	constructor(private readonly privateKey: Uint8Array) {}

	async generateTokens(userId: string): Promise<{
		accessToken: string;
		refreshToken: RefreshToken;
	}> {
		console.log(this.privateKey);
		const key = await generateLocalKey();

		const accessToken = await V4.sign({ id: userId }, key, {
			expiresIn: "7 day",
		});

		const refreshTokenString = crypto.randomUUID();
		const refreshToken = RefreshToken.create(userId, refreshTokenString);

		return { accessToken, refreshToken };
	}
}
