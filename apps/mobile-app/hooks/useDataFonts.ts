import { useFonts } from "expo-font";

export const useDanaFonts = () => {
	return useFonts({
		light: require("./../assets/fonts/danaPro/ttf/vertopal.com_DanaFaNum-Light.ttf"),
		regular: require("./../assets/fonts/danaPro/ttf/vertopal.com_DanaFaNum-Regular.ttf"),
		medium: require("./../assets/fonts/danaPro/ttf/vertopal.com_DanaFaNum-Medium.ttf"),
		demiBold: require("./../assets/fonts/danaPro/ttf/vertopal.com_DanaFaNum-DemiBold.ttf"),
		bold: require("./../assets/fonts/danaPro/ttf/vertopal.com_DanaFaNum-Bold.ttf"),
	});
};
