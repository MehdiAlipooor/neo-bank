import { BackButton } from "@/components/molecules/BackButton";
import { globalStyles } from "@/styles/global";
import { FC } from "react";
import { Text, View } from "react-native";
import { PageTitleProps } from "./types";

export const PageTitle: FC<PageTitleProps> = ({ hideBackButton, title }) => {
	return (
		<View
			style={[
				globalStyles.row,
				globalStyles.justifyBetween,
				globalStyles.alignCenter,
			]}
		>
			<View style={{ maxWidth: "33%", minWidth: "25%" }}></View>
			<View>
				<Text style={{ textAlign: "center", fontFamily: "bold", fontSize: 18 }}>
					{title}
				</Text>
			</View>
			<View
				style={{ maxWidth: "33%", minWidth: "25%", alignItems: "flex-end" }}
			>
				{!hideBackButton ? <BackButton /> : null}
			</View>
		</View>
	);
};
