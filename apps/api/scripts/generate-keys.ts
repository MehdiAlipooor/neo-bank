// scripts/generate-keys.ts

import { createPublicKey } from "node:crypto";
import { writeFileSync } from "node:fs";
import { V4 } from "paseto";

(async () => {
	// 1) تولید کلید خصوصی سازگار با v4.public
	const privateKeyObj = await V4.generateKey("public");

	// 2) استخراجِ کلید عمومی متناظر
	const publicKeyObj = createPublicKey(privateKeyObj);

	// 3) تبدیل هر دو به DER → base64
	const privateKeyDer = privateKeyObj.export({ format: "der", type: "pkcs8" });
	const publicKeyDer = publicKeyObj.export({ format: "der", type: "spki" });

	const privateKeyB64 = Buffer.from(privateKeyDer).toString("base64");
	const publicKeyB64 = Buffer.from(publicKeyDer).toString("base64");

	// 4) ذخیره در .env (اگر قبلاً وجود دارد Append/Overwrite کن)
	const env = `PASETO_PRIVATE_KEY=${privateKeyB64}
PASETO_PUBLIC_KEY=${publicKeyB64}
`;
	writeFileSync(".env", env);

	console.log("✅ PASETO key‑pair generated and saved to .env");
})();
