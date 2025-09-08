import { BaseException } from "./base-exception";

export class ValidationException extends BaseException {
	constructor(message: string) {
		super(message, "ValidationException");
	}
}
