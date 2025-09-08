export class Phone {
	constructor(private readonly value: string) {
		if (!this.validatePhone(value)) {
			throw new Error("Invalid phone format");
		}
	}

	getValue(): string {
		return this.value;
	}

	private validatePhone(phone: string): boolean {
		return !!phone;
	}
}
