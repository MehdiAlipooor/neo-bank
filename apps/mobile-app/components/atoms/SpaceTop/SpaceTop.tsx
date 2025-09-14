import { sizes } from "@/constants/theme";
import { ThemeSize } from "@/types/size";
import { FC } from "react";
import { View } from "react-native";

export type Props = {
	/**
	 * @default md
	 */
	margin?: ThemeSize | number;
};
export const SpaceTop: FC<Props> = ({ margin = sizes.md }) => {
	const marginTop = typeof margin === "number" ? margin : sizes[margin];
	return <View style={{ marginTop }} />;
};
