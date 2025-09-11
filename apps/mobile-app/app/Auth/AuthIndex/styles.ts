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
		color: "#fff",
		fontWeight: 800,
		fontSize: 40,
		textAlign: "center",
	},
	contentContainer: {
		flex: 1,
		padding: 36,
		alignItems: "center",
	},
});
