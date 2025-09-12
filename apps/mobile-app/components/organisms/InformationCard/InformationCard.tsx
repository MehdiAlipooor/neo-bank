import BellIcon from "@/components/icons/Bell";
import { ActionIcon } from "@/components/molecules/ActionIcon";
import { sizes } from "@/constants/theme";
import { globalStyles } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";

export const InformationCard = () => {
	return (
		<View style={styles.wrapper}>
			<View
				style={[
					styles.body,
					globalStyles.row,
					globalStyles.justifyBetween,
					globalStyles.alignCenter,
				]}
			>
				<ActionIcon borderColor="#2c7b8e">
					<BellIcon size={26} color="#f0fcfe" />
				</ActionIcon>
				<View>
					<Text style={styles.greetText}>خوش آمدی</Text>
					<Text style={styles.username}>نام تستی</Text>
				</View>
			</View>
		</View>
	);
};

export const styles = StyleSheet.create({
	wrapper: {
		width: "100%",
		marginTop: 24,
		paddingHorizontal: 24,
	},
	body: {
		width: "100%",
		minHeight: 60,
	},
	greetText: {
		textAlign: "right",
		fontFamily: "regular",
		color: "#fff",
		fontSize: sizes.lg,
	},
	username: {
		textAlign: "right",
		fontFamily: "bold",
		color: "#fff",
		fontSize: 24,
	},
});
