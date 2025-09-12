import { BottomSheet, BottomSheetRef } from "@/components/molecules/BottomSeet";
import {
	BottomSheetBackdrop,
	BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import {
	forwardRef,
	ReactNode,
	useCallback,
	useImperativeHandle,
	useMemo,
	useRef,
} from "react";
import { Dimensions } from "react-native";

type LogginBottomSheetProps = {
	children: ReactNode;
};

export const DepositBottomSheetTemplate = forwardRef<
	BottomSheetRef,
	LogginBottomSheetProps
>(({ children }, ref) => {
	const sheetRef = useRef<any>(null);
	const snapPoints = useMemo(() => ["1%", "80%"], []);

	const sheeViewHeight = useMemo(() => {
		const heightPercentage = snapPoints[1].slice(0, snapPoints[1].length - 1);

		return (
			(Dimensions.get("window").height * parseFloat(heightPercentage)) / 100
		);
	}, [snapPoints[1]]);

	const renderBackdrop = useCallback(
		(props: BottomSheetBackdropProps) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={1}
				appearsOnIndex={2}
			/>
		),
		[],
	);

	useImperativeHandle(ref, () => ({
		expand: () => sheetRef.current?.expand(),
		collapse: () => sheetRef.current?.collapse(),
		close: () => sheetRef.current?.close(),
		getHeight: () => sheeViewHeight,
	}));

	return (
		<BottomSheet
			ref={sheetRef}
			snapPoints={snapPoints}
			onChange={(index) => {
				if (index === 1) {
					sheetRef.current?.close();
				}
			}}
			backgroundStyle={{
				backgroundColor: "#fff",
				borderTopEndRadius: 32,
				borderTopStartRadius: 32,
			}}
			backdropComponent={renderBackdrop}
			// enableHandlePanningGesture={true}
			// enableContentPanningGesture={false}
			// enablePanDownToClose={false}
		>
			{children}
		</BottomSheet>
	);
});
