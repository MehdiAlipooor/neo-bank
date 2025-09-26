import {
	BottomSheetBackdrop,
	type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import {
	forwardRef,
	type ReactNode,
	useCallback,
	useImperativeHandle,
	useMemo,
	useRef,
} from "react";
import {
	BottomSheet,
	type BottomSheetRef,
} from "@/components/molecules/BottomSeet";

type LogginBottomSheetProps = {
	children: ReactNode;
};

export const DepositBottomSheetTemplate = forwardRef<
	BottomSheetRef,
	LogginBottomSheetProps
>(({ children }, ref) => {
	const sheetRef = useRef<any>(null);
	const snapPoints = useMemo(() => ["1%", "80%"], []);

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
		getHeight: () => sheetRef.current?.getHeight(),
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

			handleIndicatorStyle={{
				display: "flex",
			}}
		>
			{children}
		</BottomSheet>
	);
});
