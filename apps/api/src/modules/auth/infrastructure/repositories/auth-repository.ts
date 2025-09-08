import prisma from "../../../../../lib/db/prisma";
import type { IAuthRepository } from "../../application/ports/IAuthRepository";
import type { RefreshToken } from "../../domain/entities/RefreshToken";
import { User } from "../../domain/entities/User";
import type { RoleTypes } from "../../domain/enums/RoleTypes";

export class AuthRepository implements IAuthRepository {
	saveRefreshToken(rt: RefreshToken): Promise<void> {
		console.log(rt);
		throw new Error("Method not implemented.");
	}
	findRefreshToken(token: string): Promise<RefreshToken | null> {
		console.log(token);
		throw new Error("Method not implemented.");
	}
	deleteRefreshToken(token: string): Promise<void> {
		console.log(token);
		throw new Error("Method not implemented.");
	}

	async findByPhone(phone: string): Promise<User | null> {
		const user = await prisma.user.findUnique({ where: { phone: phone } });

		if (!user) {
			return null;
		}

		return new User(
			user.id,
			user.username || "",
			user.profileImageUrl || "",
			user.phone,
			user.isActive,
			user.isSuspended,
			user.role as RoleTypes,
			user.createdAt,
			user.updatedAt,
		);
	}

	async save(user: User): Promise<void> {
		const response = await prisma.user.create({
			data: { ...user },
		});

		console.log(response);
	}
}
