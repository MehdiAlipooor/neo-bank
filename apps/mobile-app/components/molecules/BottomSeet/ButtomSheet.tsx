import GorHomBottomSheet, {
	BottomSheetBackdrop as GorHomBottomSheetBackdrop,
	type BottomSheetBackdropProps as GorHomBottomSheetBackdropProps,
	type BottomSheetProps as GorHomBottomSheetProps,
	BottomSheetView as GorHomBottomSheetView,
} from "@gorhom/bottom-sheet";
import {
	forwardRef,
	useCallback,
	useImperativeHandle,
	useMemo,
	useRef,
} from "react";
import { Dimensions } from "react-native";
import { themeColors } from "@/constants/theme";
import type { BottomSheetRef } from "./types";

export const BottomSheet = forwardRef<BottomSheetRef, GorHomBottomSheetProps>(
	function BottomSheetComponent(props, ref) {
		const bottomSheetRef = useRef<GorHomBottomSheet>(null);

		const { snapPoints, backgroundStyle, children, ...rest } = props;

		const snapPointsMemo = useMemo(() => snapPoints, [snapPoints]);

		const sheetViewHeight = useMemo(() => {
			let heightPercentage = "0";
			if (
				Array.isArray(snapPointsMemo) &&
				typeof snapPointsMemo[1] === "string"
			) {
				const snapPoint = snapPointsMemo[1] as string;
				heightPercentage = snapPoint.endsWith("%")
					? snapPoint.slice(0, -1)
					: snapPoint;
			}

			return (
				(Dimensions.get("window").height * parseFloat(heightPercentage)) / 100
			);
		}, [snapPointsMemo]);

		useImperativeHandle(ref, () => ({
			expand: () => bottomSheetRef.current?.expand(),
			collapse: () => bottomSheetRef.current?.collapse(),
			close: () => bottomSheetRef.current?.close(),
			getHeight: () => sheetViewHeight,
		}));

		const renderBackdrop = useCallback(
			(props: GorHomBottomSheetBackdropProps) => (
				<GorHomBottomSheetBackdrop
					disappearsOnIndex={0}
					appearsOnIndex={1}
					{...props}
					// Theming for backdrop
					opacity={0.5}
					pressBehavior="close"
					//   appearsOnMount
					// You can add more theme-based props here if needed
				/>
			),
			[],
		);

		return (
			<GorHomBottomSheet
				ref={bottomSheetRef}
				index={-1}
				snapPoints={snapPointsMemo}
				enablePanDownToClose
				enableOverDrag={false}
				detached
				enableBlurKeyboardOnGesture
				bottomInset={0}
				backgroundStyle={[
					{
						backgroundColor: themeColors.dark,
						borderRadius: 16,
					},
					backgroundStyle,
				]}
				handleIndicatorStyle={{
					display: "none",
					backgroundColor: themeColors.Primary,
				}}
				backdropComponent={renderBackdrop}
				{...rest}
			>
				<GorHomBottomSheetView
					style={{
						flex: 1,
						padding: 16,
						backgroundColor: themeColors.dark,
					}}
				>
					{children}
				</GorHomBottomSheetView>
			</GorHomBottomSheet>
		);
	},
);
