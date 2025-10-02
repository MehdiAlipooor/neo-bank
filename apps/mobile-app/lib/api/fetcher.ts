import { enviroments } from "@/constants/env";

export interface FetcherOptions extends RequestInit {
	token?: string;
}

export const fetcher = async <T>(
	url: string,
	{ token, ...options }: FetcherOptions = {},
): Promise<T> => {
	const headers: HeadersInit = {
		"Content-Type": "application/json",
		...(token ? { Authorization: `Bearer ${token}` } : {}),
	};

	const res = await fetch(`${enviroments.baseUrl}/${url}`, {
		...options,
		headers,
	});

	if (!res.ok) {
		const errorBody = await res.json().catch(() => ({}));
		const error = new Error(res.statusText || "Fetch error") as any;
		error.status = res.status;
		error.body = errorBody;
		throw error;
	}

	// If no content
	if (res.status === 204) return null as any;

	return res.json();
};
