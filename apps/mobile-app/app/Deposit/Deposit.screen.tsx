import { CustomButton } from "@/components/atoms/CustomButton";
import { BottomSheetRef } from "@/components/molecules/BottomSeet";
import { CardNumberList } from "@/components/organisms/CardNumberList";
import { DepositForm } from "@/components/organisms/DepositForm";
import { PageTItle } from "@/components/organisms/PageTItle";
import { DepositBottomSheetTemplate } from "@/components/templates/DepositBottomSheet";
import { useCallback, useRef } from "react";
import { useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Layout } from "./layout";

export const DepositScreen = () => {
	const { height } = useWindowDimensions();
	const bottomSheetRef = useRef<BottomSheetRef>(null);

	const bottomSheetHeight = bottomSheetRef?.current?.getHeight();

	const calculateViewHeight = useCallback(() => {
		return height - 24 - 150;
	}, []);

	const onConfirmHandler = () => {
		bottomSheetRef.current?.expand();
	};

	return (
		<SafeAreaView>
			<Layout>
				<View style={{ height: calculateViewHeight() }}>
					<PageTItle title="واریز به حساب" />
					<View style={{ marginTop: 32 }} />
					<CardNumberList />
				</View>
				<CustomButton
					size="lg"
					varient="dark"
					title="تایید"
					onPress={onConfirmHandler}
				/>
			</Layout>
			<DepositBottomSheetTemplate ref={bottomSheetRef}>
				<DepositForm bottomSheetHeight={bottomSheetHeight!} />
			</DepositBottomSheetTemplate>
		</SafeAreaView>
	);
};
