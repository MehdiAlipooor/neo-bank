import { themeColors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	checkButton: {
		width: 32,
		height: 32,
		borderRadius: "100%",
		borderWidth: 1,
		borderColor: "#eee",
	},
	checkButtonActive: {
		borderColor: themeColors.Primary,
		backgroundColor: themeColors.Primary,
	},
});
