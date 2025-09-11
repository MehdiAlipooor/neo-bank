export async function fetchWallets() {
	const res = await fetch("http://localhost:7000/auth/login");
	if (!res.ok) throw new Error("Failed to fetch wallets");
	return res.json();
}
