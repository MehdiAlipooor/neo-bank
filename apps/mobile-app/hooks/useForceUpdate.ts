import { useEffect, useState } from "react";

export const useForceUpdate = (timeout = 1000) => {
	const [, setDate] = useState(new Date());

	useEffect(() => {
		setTimeout(() => {
			setDate(new Date());
		}, timeout);
	}, [timeout]);
};
