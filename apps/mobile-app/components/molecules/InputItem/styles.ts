import { StyleSheet } from "react-native";
import { sizes, themeColors, themRadius } from "@/constants/theme";

export const styles = StyleSheet.create({
	input: {
		width: "100%",
		height: 48,
		borderWidth: 0.5,
		borderColor: "#e6e6e6",
		borderRadius: themRadius.md,
		color: themeColors.dark,
		padding: sizes.md,
	},
});
