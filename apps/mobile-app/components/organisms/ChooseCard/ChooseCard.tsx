import { themeColors } from "@/constants/theme";
import { Text, View } from "react-native";
import { WalletCard } from "../WalletCard";

export const ChooseCard = () => {
	return (
		<View>
			<Text
				style={{
					fontSize: 18,
					fontFamily: "bold",
					color: themeColors.dark,
					textAlign: "right",
					marginBottom: 12,
				}}
			>
				انتخاب کارت
			</Text>
			<WalletCard />
		</View>
	);
};
