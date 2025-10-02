import type { FC } from "react";
import { Pressable } from "react-native";
import { CheckIcon } from "@/components/icons/Chcek";
import { globalStyles } from "@/styles/global";
import { styles } from "./styles";

export type CheckButtonProps = {
	/**
	 * @default false
	 */
	isActive?: boolean;
};
export const CheckButton: FC<CheckButtonProps> = ({ isActive = false }) => {
	return (
		<Pressable
			style={[
				styles.checkButton,
				globalStyles.center,
				isActive && styles.checkButtonActive,
			]}
		>
			{isActive ? <CheckIcon strokeWidth={2} size={24} color="#fff" /> : null}
		</Pressable>
	);
};
