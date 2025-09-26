import { StyleSheet } from "react-native";
import { themeColors } from "@/constants/theme";

export const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		position: "absolute",
		bottom: -40,
		justifyContent: "center",
		alignItems: "center",
	},
	text: { fontSize: 12, color: themeColors.dark },
});
