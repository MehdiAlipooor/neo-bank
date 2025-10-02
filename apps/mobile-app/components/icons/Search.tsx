import Svg, { Path } from "react-native-svg";

type Props = {
	size?: number;
	color?: string;
	strokeWidth?: number;
};

export const SearchIcon = (props: Props) => (
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
		<Path fill="none" d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
		<Path d="M21 21l-6 -6" />
	</Svg>
);

export default SearchIcon;
