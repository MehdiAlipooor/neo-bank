import { useCallback, useRef } from "react";
import { useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton } from "@/components/atoms/CustomButton";
import type { BottomSheetRef } from "@/components/molecules/BottomSeet";
import { CardNumberList } from "@/components/organisms/CardNumberList";
import { DepositForm } from "@/components/organisms/DepositForm";
import { PageTitle } from "@/components/organisms/PageTitle";
import { DepositBottomSheetTemplate } from "@/components/templates/DepositBottomSheet";
import { useForceUpdate } from "@/hooks/useForceUpdate";
import { Layout } from "./layout";
// 185

export const DepositScreen = () => {
	const { height } = useWindowDimensions();
	const bottomSheetRef = useRef<BottomSheetRef>(null);

	// const { mutate } = useCreateDepositRequest();

	useForceUpdate(1);

	const bottomSheetHeight = bottomSheetRef?.current?.getHeight();

	const calculateViewHeight = useCallback(() => {
		return height - 24 - 150;
	}, [height]);

	const onConfirmHandler = () => {
		bottomSheetRef.current?.expand();
	};

	// const onSubmit = async () => {
	// 	mutate();
	// };

	return (
		<SafeAreaView>
			<Layout>
				<View style={{ height: calculateViewHeight() }}>
					<PageTitle title="واریز به حساب" />
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
				<DepositForm bottomSheetHeight={bottomSheetHeight ?? 0} />
			</DepositBottomSheetTemplate>
		</SafeAreaView>
	);
};
