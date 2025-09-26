import type { FC } from "react";
import { Image, View } from "react-native";
import { globalStyles } from "@/styles/global";
import { styles } from "./styles";

export type BankAvatarProps = {
	icon: string;
};
export const BankAvatar: FC<BankAvatarProps> = ({ icon }) => {
	return (
		<View style={[styles.wrapper, globalStyles.center]}>
			<Image source={{ uri: icon }} width={24} height={24} />
		</View>
	);
};
