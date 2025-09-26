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

export const LogginBottomSheetTemplate = forwardRef<
	BottomSheetRef,
	LogginBottomSheetProps
>(({ children }, ref) => {
	const sheetRef = useRef<any>(null);
	const snapPoints = useMemo(() => ["1%", "70%"], []);

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
		getHeight: () => undefined,
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
			}}
			handleIndicatorStyle={{
				display: "none",
			}}
			backdropComponent={renderBackdrop}
		>
			{children}
		</BottomSheet>
	);
});
