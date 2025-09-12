import { themeColors } from "@/constants/theme";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
	size?: number;
	color?: string;
	strokeWidth?: number
};

export function CategoryPlusIcon({
	size = 24,
	color = "black",
	...props
}: Props) {
	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke={color}
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<Path stroke="none" d="M0 0h24v24H0z" fill="none" />

			<Path stroke={themeColors.dark} d="M4 4h6v6h-6z" />

			<Path stroke={themeColors.dark} d="M14 4h6v6h-6z" />

			<Path stroke={themeColors.dark} d="M4 14h6v6h-6z" />

			<Path stroke={themeColors.Primary} d="M20 17h-6m3 -3v6" />
		</Svg>
	);
}
