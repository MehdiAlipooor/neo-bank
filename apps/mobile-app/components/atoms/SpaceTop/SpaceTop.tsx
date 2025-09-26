import type { FC } from "react";
import { View } from "react-native";
import { sizes } from "@/constants/theme";
import type { ThemeSize } from "@/types/size";

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
