import Svg, { Path } from "react-native-svg";
import { themeColors } from "@/constants/theme";

type Props = {
	size?: number;
	color?: string;
	strokeWidth?: number;
};

export function CashPlusIcon({ size = 24, color = "black", ...props }: Props) {
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
			<Path
				stroke={themeColors.dark}
				d="M7 15h-3a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v3"
			/>
			<Path
				stroke={themeColors.Primary}
				d="M12 19h-4a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v2.5"
			/>
			<Path
				stroke={themeColors.Primary}
				d="M12 14a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"
			/>
			<Path stroke={themeColors.dark} d="M16 19h6" />
			<Path stroke={themeColors.dark} d="M19 16v6" />
		</Svg>
	);
}
