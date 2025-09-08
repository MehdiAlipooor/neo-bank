export class Username {
	private readonly value: string;

	constructor(value: string) {
		if (!this.validate(value)) {
			throw new Error("Invalid username format");
		}
		this.value = value;
	}

	getValue(): string {
		return this.value;
	}

	private validate(name: string): boolean {
		// Example rules:
		// - 3 to 30 chars
		// - Letters, numbers, underscores only
		// - No spaces or special chars
		const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
		return usernameRegex.test(name);
	}
}
