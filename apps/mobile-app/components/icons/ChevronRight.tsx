import Svg, { Path } from "react-native-svg";

type Props = {
	size?: number;
	color?: string;
	strokeWidth?: number;
};

export function ChevronRightIcon({
	size = 24,
	color = "black",
	...props
}: Props) {
	return (
		<Svg
			width={24}
			height={24}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<Path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<Path d="M9 6l6 6l-6 6" />
		</Svg>
	);
}
