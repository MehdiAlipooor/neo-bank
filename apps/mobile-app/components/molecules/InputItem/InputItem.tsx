import { themeColors } from "@/constants/theme";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { FC } from "react";
import { Text, TextInput, View } from "react-native";
import { styles } from "./styles";

type InputItemProps = {
	label: string;
	parent?: "bottomSheet";
};
export const InputItem: FC<InputItemProps> = ({ label, parent }) => {
	return (
		<View>
			{label ? (
				<Text
					style={{
						color: themeColors.dark,
						marginBottom: 4,
						fontFamily: "medium",
						textAlign: "right",
					}}
				>
					{label}
				</Text>
			) : null}
			{parent === "bottomSheet" ? (
				<BottomSheetTextInput style={styles.input} />
			) : (
				<TextInput style={styles.input} />
			)}
		</View>
	);
};
