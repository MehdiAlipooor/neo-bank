export class BaseException extends Error {
	constructor(
		message: string,
		public readonly name = "BaseException",
	) {
		super(message);
		this.name = name;
	}
}
