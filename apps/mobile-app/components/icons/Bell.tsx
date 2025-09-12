import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
	size?: number;
	color?: string;
	stroke?: number;
};

export default function BellIcon({
	size = 24,
	stroke = 1.5,
	color = "currentColor",
	...props
}: Props) {
	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke={color}
			strokeWidth={stroke}
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<Path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<Path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
			<Path d="M9 17v1a3 3 0 0 0 6 0v-1" />
		</Svg>
	);
}
