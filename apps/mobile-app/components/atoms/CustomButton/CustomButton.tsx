import { buttonSizes, buttonVarients, themRadius } from "@/constants/theme";
import { FC } from "react";
import { Pressable, Text } from "react-native";
import { styles } from "./styles";
import { ButtonProps } from "./types";

export const CustomButton: FC<ButtonProps> = ({
	children,
	size = "sm",
	title,
	varient = "Primary",
	raduis = "xl",
	onPress,
}) => {
	const { height, padding } = buttonSizes[size];
	const { backgroundColor, textColor } = buttonVarients[varient];
	const borderRadius = typeof raduis === "number" ? raduis : themRadius[raduis];

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
			{children ? children : <Text style={{ color: textColor, fontSize: 18, fontFamily:'regular' }}>{title}</Text>}
		</Pressable>
	);
};
