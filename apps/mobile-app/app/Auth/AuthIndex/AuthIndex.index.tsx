import { CustomButton } from "@/components/atoms/CustomButton";
import { LoginForm } from "@/components/organisms/LoginForm";
import { LogginBottomSheetTemplate } from "@/components/templates/LogginBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";

export const AuthIndexScreen = () => {
	const bottomSheetRef = useRef<BottomSheet>(null);

	return (
		<View style={styles.wrapper}>
			<View>
				<Image
					source={require("./../../../assets/auth/hero.webp")}
					style={styles.heroImage}
				/>
			</View>
			<View style={styles.footerWrapper}>
				<Text style={styles.text}>One Account For All You Need</Text>
				<CustomButton
					raduis={50}
					size="lg"
					title="Welcome"
					onPress={() => {
						bottomSheetRef.current?.expand();
					}}
				/>
			</View>
			<LogginBottomSheetTemplate ref={bottomSheetRef}>
				<LoginForm />
			</LogginBottomSheetTemplate>
		</View>
	);
};
