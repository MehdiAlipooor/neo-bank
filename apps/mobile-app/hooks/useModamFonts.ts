import { useFonts } from "expo-font";

export const useModamFonts = () => {
	return useFonts({
		modamMedium: require("./../assets/fonts/modam/ttf/ModamFaNumWeb-Medium.ttf"),
		modamBold: require("./../assets/fonts/modam/ttf/ModamFaNumWeb-Bold.ttf"),
	});
};
