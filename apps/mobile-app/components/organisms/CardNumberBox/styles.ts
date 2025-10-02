import { StyleSheet } from "react-native";
import { themRadius } from "@/constants/theme";

export const styles = StyleSheet.create({
	listWrapper: {
		width: "100%",
		marginTop: 24,
		gap: 16,
	},
	listItem: {
		padding: 24,
		borderWidth: 1,
		borderColor: "#eee",
		borderRadius: themRadius.xl,
		gap: 16,
	},
	listContentWrapper: {
		flex: 1,
	},
	textWrapper: {
		gap: 4,
	},
	numberText: {
		textAlign: "right",
		color: "#6f727a",
		fontFamily: "medium",
		fontSize: 14,
	},
	titleText: {
		textAlign: "right",
		fontFamily: "demiBold",
		fontSize: 16,
	},
});
