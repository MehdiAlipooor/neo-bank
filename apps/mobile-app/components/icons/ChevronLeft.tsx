import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
	size?: number;
	color?: string;
	strokeWidth?: number;
};

export function ChevronLeftIcon({
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
			{/* Invisible bounding box */}
			<Path stroke="none" d="M0 0h24v24H0z" fill="none" />
			{/* Chevron left */}
			<Path d="M15 6l-6 6l6 6" />
		</Svg>
	);
}
