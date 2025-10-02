import { StyleSheet } from "react-native";
import { themeColors, themRadius } from "@/constants/theme";

export const styles = StyleSheet.create({
	cardBody: {
		width: "100%",
		height: 200,
		// paddingHorizontal: 24,
	},
	card: {
		width: "100%",
		height: "100%",
		backgroundColor: themeColors.Primary,
		borderRadius: themRadius.xl,
		overflow: "hidden",
	},
	cardHeader: {
		width: "100%",
		height: 130,
		backgroundColor: themeColors.dark,
	},
});
