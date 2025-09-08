import type { Hold } from "../../domain/entities/hold.entity";

export interface IHoldRepository {
	create(hold: Hold, tx?: any): Promise<Hold>;
	update(hold: Hold, tx?: any): Promise<void>;

	findActiveByTransfer(transferId: string, tx?: any): Promise<Hold>;

	findById(id: string, tx?: any): Promise<Hold | null>;
}
