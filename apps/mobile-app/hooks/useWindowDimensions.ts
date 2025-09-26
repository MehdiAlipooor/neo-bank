import { useEffect, useState } from "react";
import { Dimensions, type ScaledSize } from "react-native";

export function useWindowDimensions() {
	const [window, setWindow] = useState(Dimensions.get("window"));

	useEffect(() => {
		const onChange = ({ window: newWindow }: { window: ScaledSize }) => {
			setWindow(newWindow);
		};

		const subscription = Dimensions.addEventListener("change", onChange);

		return () => {
			subscription.remove();
		};
	}, []);

	return window;
}
