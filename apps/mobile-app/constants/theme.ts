/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { ThemeColor } from "@/types/colors";
import { ThemeRadius } from "@/types/radius";
import { ThemeSize } from "@/types/size";
import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

const buttonPadding = {
	sm: 8,
	md: 12,
	lg: 16,
	xl: 20,
};

export const buttonSizes: Record<
	ThemeSize,
	{ height: number; padding: number }
> = {
	sm: {
		height: 40,
		padding: 8,
	},
	md: {
		height: 48,
		padding: 12,
	},
	lg: {
		height: 56,
		padding: 16,
	},
	xl: {
		height: 64,
		padding: 20,
	},
};
export const themeColors: Record<ThemeColor, string> = {
	Primary: "#0b6375",
	dark: "#111727",
};

export const buttonVarients: Record<
	ThemeColor,
	{ backgroundColor: string; textColor: string }
> = {
	Primary: {
		backgroundColor: themeColors.Primary,
		textColor: "#fff",
	},
	dark: {
		backgroundColor: themeColors.dark,
		textColor: "#fff",
	},
};

export const sizes: Record<ThemeRadius, number> = {
	sm: 4,
	md: 8,
	lg: 12,
	xl: 16,
	xlg: 24,
};
export const themRadius: Record<ThemeRadius, number> = {
	sm: 4,
	md: 8,
	lg: 12,
	xl: 16,
	xlg: 24,
};

export const Colors = {
	light: {
		text: "#11181C",
		background: "#fff",
		authPageBackground: "#0c0c0c",
		tint: tintColorLight,
		icon: "#687076",
		tabIconDefault: "#687076",
		tabIconSelected: tintColorLight,
	},
	dark: {
		text: "#ECEDEE",
		background: "#151718",
		tint: tintColorDark,
		authPageBackground: "#0c0c0c",
		icon: "#9BA1A6",
		tabIconDefault: "#9BA1A6",
		tabIconSelected: tintColorDark,
	},
};

export const Fonts = Platform.select({
	ios: {
		/** iOS `UIFontDescriptorSystemDesignDefault` */
		sans: "system-ui",
		/** iOS `UIFontDescriptorSystemDesignSerif` */
		serif: "ui-serif",
		/** iOS `UIFontDescriptorSystemDesignRounded` */
		rounded: "ui-rounded",
		/** iOS `UIFontDescriptorSystemDesignMonospaced` */
		mono: "ui-monospace",
	},
	default: {
		sans: "normal",
		serif: "serif",
		rounded: "normal",
		mono: "monospace",
	},
	web: {
		sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
		serif: "Georgia, 'Times New Roman', serif",
		rounded:
			"'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
		mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
	},
});
