import { themeColors } from "@/constants/theme";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
	size?: number;
	color?: string;
	strokeWidth?: number;
};

export function TransferIcon({ size = 24, color = "black", ...props }: Props) {
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
			<Path stroke={themeColors.dark} d="M20 10h-16l5.5 -6" />
			<Path stroke={themeColors.Primary} d="M4 14h16l-5.5 6" />
		</Svg>
	);
}
