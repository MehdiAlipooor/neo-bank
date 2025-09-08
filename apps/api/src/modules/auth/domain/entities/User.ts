import { RoleTypes } from "../enums/RoleTypes";

export class User {
	constructor(
		public readonly id: string,
		public readonly username: string,
		public readonly profileImageUrl: string,
		public readonly phone: string,
		public readonly isActive: boolean,
		public readonly isSuspended: boolean,
		public readonly role: RoleTypes,
		public createdAt: Date = new Date(),
		public updatedAt: Date = new Date(),
	) {}

	static create(username: string, phone: string): User {
		const id = crypto.randomUUID();
		const isActive = true;
		const isSuspended = false;
		const profileImageUrl = "";
		const role = RoleTypes.USER;

		return new User(
			id,
			username,
			profileImageUrl,
			phone,
			isActive,
			isSuspended,
			role,
		);
	}
}
