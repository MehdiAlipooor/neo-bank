export interface IOutboxRepository {
	add: (eventType: string, payload: any) => Promise<any>;
	getUnprocessed: (limit: number) => Promise<any>;
	markProcessed: (id: string) => Promise<any>;
}
