import { themeColors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	wrapper: {
		width: "100%",
		flex: 1,
		justifyContent: "space-between",
		paddingHorizontal: 24,
		paddingVertical: 24,
	},
	heroImage: {
		width: "100%",
		height: 300,
	},
	footerWrapper: {
		gap: 120,
	},
	text: {
		color: themeColors.dark,
		fontSize: 35,
		textAlign: "right",
		fontFamily: "modamBold",
	},
	subText: {
		color: "#5d5d66",
		fontSize: 16,
		marginTop: 8,
		textAlign: "right",
		fontFamily: "medium",
	},
	contentContainer: {
		flex: 1,
		padding: 36,
		alignItems: "center",
	},
	formBody: {
		width: "100%",
		justifyContent: "space-between",
		flex: 1,
	},
	loginTitle: {
		fontSize: 32,
		color: themeColors.dark,
		marginBottom: 24,
		fontWeight: 600,
		textAlign: "right",
		fontFamily: "modamBold",
		width: 260,
	},
	brandText: {
		fontSize: 38,
		color: themeColors.Primary,
		marginBottom: 24,
		fontWeight: 600,
	},
});
