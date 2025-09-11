import { buttonRadius, buttonSizes, buttonVarients } from "@/constants/theme";
import { FC } from "react";
import { Pressable, Text } from "react-native";
import { styles } from "./styles";
import { ButtonProps } from "./types";

export const CustomButton: FC<ButtonProps> = ({
	children,
	size = "sm",
	title,
	varient = "Primary",
	raduis = "md",
	onPress,
}) => {
	const { height, padding } = buttonSizes[size];
	const { backgroundColor, textColor } = buttonVarients[varient];
	const borderRadius =
		typeof raduis === "number" ? raduis : buttonRadius[raduis];

	return (
		<Pressable
			onPress={onPress}
			style={[
				{
					height,
					backgroundColor,
					padding,
					borderRadius,
				},
				styles.button,
			]}
		>
			{children ? children : <Text style={{ color: textColor }}>{title}</Text>}
		</Pressable>
	);
};
