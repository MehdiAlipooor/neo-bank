import { RoleTypes } from "../enums/RoleTypes";

export class Role {
	private readonly value: RoleTypes;

	constructor(value: string) {
		if (!this.isValid(value)) {
			throw new Error(`Invalid role: ${value}`);
		}
		this.value = value as RoleTypes;
	}

	getValue(): RoleTypes {
		return this.value;
	}

	private isValid(value: string): boolean {
		return Object.values(RoleTypes).includes(value as RoleTypes);
	}

	equals(other: Role): boolean {
		return this.value === other.value;
	}
}
