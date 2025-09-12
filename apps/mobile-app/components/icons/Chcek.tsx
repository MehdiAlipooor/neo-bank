import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
	size?: number;
	color?: string;
	strokeWidth?: number;
};

export function CheckIcon({ size = 24, color = "black", ...props }: Props) {
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
			{/* Invisible bounding box */}
			<Path stroke="none" d="M0 0h24v24H0z" fill="none" />
			{/* Checkmark */}
			<Path d="M5 12l5 5l10 -10" />
		</Svg>
	);
}
