import { StyleSheet, TextInput, View } from "react-native";
import SearchIcon from "@/components/icons/Search";
import { themeColors, themRadius } from "@/constants/theme";
import { globalStyles } from "@/styles/global";

export const SearchInput = () => {
	return (
		<View style={[styles.wrapper, globalStyles.row]}>
			<TextInput
				style={styles.input}
				placeholder="جستجوی مخاطبان..."
				placeholderTextColor="#9da1a7"
			/>
			<View style={[styles.iconWrapper, globalStyles.center]}>
				<SearchIcon size={24} color={themeColors.dark} />
			</View>
		</View>
	);
};

export const styles = StyleSheet.create({
	wrapper: {
		width: "100%",
		height: 52,
		backgroundColor: "#f9fbfc",
		borderRadius: themRadius.lg,
	},
	iconWrapper: {
		width: 52,
		height: 52,
	},
	input: {
		flex: 1,
		height: 52,
		textAlign: "right",
		fontFamily: "medium",
		fontSize: 16,
	},
});
