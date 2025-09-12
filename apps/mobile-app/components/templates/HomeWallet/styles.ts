import { themeColors, themRadius } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	wrapper: {
		width: "100%",
		height: 304,
		position: "relative",
	},
	cardWrapper: {
		width: "100%",
		height: 234,
		backgroundColor: themeColors.Primary,
	},
	cardBody: {
		width: "100%",
		height: 200,
		position: "absolute",
		bottom: 0,
		zIndex: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.24,
		shadowRadius: 3.84,
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
