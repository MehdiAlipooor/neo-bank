import type { ReactNode } from "react";

export type ActionIconProps = {
	children?: ReactNode;

	/**
	 * @default #000
	 */
	borderColor?: string;

	/**
	 * @default themRadius.xl
	 */
	borderRadius?: number;

	/**
	 * @default 48
	 */
	width?: number;

	/**
	 * @default 48
	 */
	height?: number;
};
