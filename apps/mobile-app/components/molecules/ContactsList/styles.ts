import { StyleSheet } from "react-native";
import { themeColors, themRadius } from "@/constants/theme";

export const styles = StyleSheet.create({
	title: {
		fontSize: 18,
		fontFamily: "bold",
		color: themeColors.dark,
		textAlign: "right",
		marginBottom: 12,
		position: "relative",
	},
	rowItem: {
		width: 160,
		height: 180,
		borderWidth: 1.5,
		borderColor: "#ebebeb",
		borderRadius: themRadius.xl,
		gap: 16,
	},
	checkIcon: {
		position: "absolute",
		top: 16,
		left: 16,
		transform: [{ rotateZ: "360deg" }],
	},
	activeRow: {
		borderColor: themeColors.Primary,
	},
	name: {
		textAlign: "center",
		fontFamily: "demiBold",
		fontSize: 16,
	},
});
