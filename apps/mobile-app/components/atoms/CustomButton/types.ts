import type { ReactNode } from "react";
import type { ThemeColor } from "@/types/colors";
import type { ThemeRadius } from "@/types/radius";
import type { ThemeSize } from "@/types/size";

export type ButtonProps = {
	children?: ReactNode;
	title?: string;
	size?: ThemeSize;
	varient?: ThemeColor;

	raduis?: ThemeRadius | number;

	onPress?: () => void;
};
