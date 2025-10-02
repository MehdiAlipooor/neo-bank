import type { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { BankAvatar } from "@/components/molecules/BankAvatar";
import { CheckButton } from "@/components/molecules/CheckButton";
import { globalStyles } from "@/styles/global";
import { styles } from "./styles";
import type { CardNumberBoxProps } from "./types";

export const CardNumberBox: FC<CardNumberBoxProps> = ({
	icon,
	id,
	number,
	title,
	isActive,
	hideSelect,
	activeOpacity = 0,
}) => {
	return (
		<TouchableOpacity
			activeOpacity={activeOpacity}
			key={id}
			style={[
				globalStyles.row,
				globalStyles.alignCenter,
				globalStyles.justifyBetween,
				styles.listItem,
			]}
		>
			<View
				style={[
					globalStyles.row,
					globalStyles.flex1,
					globalStyles.justifyBetween,
					globalStyles.alignCenter,
				]}
			>
				<View style={[globalStyles.center]}>
					{!hideSelect ? <CheckButton isActive={isActive} /> : null}
				</View>
				<View style={styles.textWrapper}>
					<Text style={styles.titleText}>{title}</Text>
					<Text style={styles.numberText}>{number}</Text>
				</View>
			</View>
			<View>
				<BankAvatar icon={icon} />
			</View>
		</TouchableOpacity>
	);
};
