import { BackButton } from "@/components/molecules/BackButton";
import { globalStyles } from "@/styles/global";
import { FC } from "react";
import { Text, View } from "react-native";
import { PageTitleProps } from "./types";

export const PageTItle: FC<PageTitleProps> = ({ hideBackButton, title }) => {
	return (
		<View
			style={[
				globalStyles.row,
				globalStyles.justifyBetween,
				globalStyles.alignCenter,
			]}
		>
			<View style={{ maxWidth: "33%", minWidth: "25%" }}>
				{!hideBackButton ? <BackButton /> : null}
			</View>
			<View>
				<Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}>
					{title}
				</Text>
			</View>
			<View style={{ maxWidth: "33%", minWidth: "25%" }}></View>
		</View>
	);
};
