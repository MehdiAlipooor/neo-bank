export class Email {
	constructor(private readonly value: string) {
		if (!this.validateEmail(value)) {
			throw new Error("Invalid email format");
		}
	}

	getValue(): string {
		return this.value;
	}

	private validateEmail(email: string): boolean {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}
}
