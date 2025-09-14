import { useDanaFonts } from "@/hooks/useDataFonts";
import { useModamFonts } from "@/hooks/useModamFonts";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { I18nManager } from "react-native";
import { RootLayout } from "./layout";
import { Nav } from "./nav";

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

SplashScreen.preventAutoHideAsync();

export default function Index() {
	const [loaded, error] = useDanaFonts();
	const [modamLoaded, modamError] = useModamFonts();

	useEffect(() => {
		if (loaded || error || modamError || modamLoaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	return (
		<RootLayout>
			<Nav />
		</RootLayout>
	);
}
