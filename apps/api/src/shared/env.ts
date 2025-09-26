import dotenv from "dotenv";

dotenv.config();

export const env = {
	DATABASE_URL: process.env.DATABASE_URL as string,
	PASETO_PRIVATE_KEY: process.env.PASETO_PRIVATE_KEY as string, // base64
	PASETO_PUBLIC_KEY: process.env.PASETO_PUBLIC_KEY as string, // base64
};
