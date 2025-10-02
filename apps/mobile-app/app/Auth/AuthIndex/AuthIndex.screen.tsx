import { useRef } from "react";
import { Image, Text, View } from "react-native";
import { CustomButton } from "@/components/atoms/CustomButton";
import type { BottomSheetRef } from "@/components/molecules/BottomSeet";
import { TermsOfUseButton } from "@/components/molecules/TermsOfuseButton";
import { LoginForm } from "@/components/organisms/LoginForm";
import { LogginBottomSheetTemplate } from "@/components/templates/LogginBottomSheet";
import { themeColors } from "@/constants/theme";
import { styles } from "./styles";

export const AuthIndexScreen = () => {
	const bottomSheetRef = useRef<BottomSheetRef>(null);

	return (
		<View style={styles.wrapper}>
			<View>
				<Image
					source={require("./../../../assets/auth/hero.webp")}
					style={styles.heroImage}
				/>
			</View>
			<View style={styles.footerWrapper}>
				<View>
					<Text style={[styles.text]}>
						هدف گزاری برای{" "}
						<Text style={{ color: themeColors.Primary }}>پیشرفت</Text>
					</Text>
					<Text style={[styles.subText]}>
						تمام امور مالی تون رو توی یکجا مدیریت کنید، پس انداز کنید، گزارش ها
						رو ببینید و هدف گزاری کنید
					</Text>
				</View>
				<CustomButton
					raduis={50}
					size="lg"
					title="ورود"
					onPress={() => {
						bottomSheetRef.current?.expand();
					}}
				/>
			</View>
			<LogginBottomSheetTemplate ref={bottomSheetRef}>
				<View style={styles.formBody}>
					<View>
						<View style={{ alignItems: "flex-end" }}>
							<Text style={[styles.loginTitle]}>
								وارد اکانت <Text style={styles.brandText}>برند</Text> بشید
							</Text>
						</View>
						<LoginForm />
					</View>
					<TermsOfUseButton />
				</View>
			</LogginBottomSheetTemplate>
		</View>
	);
};
