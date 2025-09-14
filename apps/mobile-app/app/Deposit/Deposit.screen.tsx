import { CustomButton } from "@/components/atoms/CustomButton";
import { BottomSheetRef } from "@/components/molecules/BottomSeet";
import { CardNumberList } from "@/components/organisms/CardNumberList";
import { DepositForm } from "@/components/organisms/DepositForm";
import { PageTitle } from "@/components/organisms/PageTitle";
import { DepositBottomSheetTemplate } from "@/components/templates/DepositBottomSheet";
import { useForceUpdate } from "@/hooks/useForceUpdate";
import { useCallback, useRef } from "react";
import { useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCreateDepositRequest } from "./hooks/createDepositRequest";
import { Layout } from "./layout";
// 185

export const DepositScreen = () => {
	const { height } = useWindowDimensions();
	const bottomSheetRef = useRef<BottomSheetRef>(null);

	const { mutate, isPending, error, data } = useCreateDepositRequest();

	useForceUpdate(1);

	const bottomSheetHeight = bottomSheetRef?.current?.getHeight();

	const calculateViewHeight = useCallback(() => {
		return height - 24 - 150;
	}, []);

	const onConfirmHandler = () => {
		bottomSheetRef.current?.expand();
	};

	const onSubmit = async () => {
		mutate();
	};

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
				<DepositForm
					bottomSheetHeight={bottomSheetHeight!}
					onSubmit={onSubmit}
				/>
			</DepositBottomSheetTemplate>
		</SafeAreaView>
	);
};
