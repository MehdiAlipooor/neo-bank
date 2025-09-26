import type { FC } from "react";
import { Pressable } from "react-native";
import { themRadius } from "@/constants/theme";
import { globalStyles } from "@/styles/global";
import { styles } from "./styles";
import type { ActionIconProps } from "./types";

export const ActionIcon: FC<ActionIconProps> = ({
	children,
	borderColor = "#000",
	borderRadius = themRadius.xl,
	width = 48,
	height = 48,
}) => {
	return (
		<Pressable
			style={[
				styles.actionIcon,
				globalStyles.alignCenter,
				globalStyles.justifyCenter,
				{
					borderColor,
					borderRadius,
					width,
					height,
				},
			]}
		>
			{children}
		</Pressable>
	);
};
