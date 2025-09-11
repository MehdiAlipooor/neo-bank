import { ThemeColor } from "@/types/colors";
import { ThemeRadius } from "@/types/radius";
import { ThemeSize } from "@/types/size";
import { ReactNode } from "react";

export type ButtonProps = {
	children?: ReactNode;
	title?: string;
	size?: ThemeSize;
	varient?: ThemeColor;

	raduis?: ThemeRadius | number;

	onPress?: () => void;
};
