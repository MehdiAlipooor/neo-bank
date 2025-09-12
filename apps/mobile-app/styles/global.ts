import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
	/** Flex Direction */
	row: { flexDirection: "row" },
	rowReverse: { flexDirection: "row-reverse" },
	column: { flexDirection: "column" },
	columnReverse: { flexDirection: "column-reverse" },

	/** Flex Wrap */
	wrap: { flexWrap: "wrap" },
	noWrap: { flexWrap: "nowrap" },

	center: { alignItems: "center", justifyContent: "center" },

	/** Alignment (cross axis) */
	alignStart: { alignItems: "flex-start" },
	alignCenter: { alignItems: "center" },
	alignEnd: { alignItems: "flex-end" },
	alignStretch: { alignItems: "stretch" },
	alignBaseline: { alignItems: "baseline" },

	/** Justification (main axis) */
	justifyStart: { justifyContent: "flex-start" },
	justifyCenter: { justifyContent: "center" },
	justifyEnd: { justifyContent: "flex-end" },
	justifyBetween: { justifyContent: "space-between" },
	justifyAround: { justifyContent: "space-around" },
	justifyEvenly: { justifyContent: "space-evenly" },

	/** Grow/Shrink helpers */
	flex1: { flex: 1 },
	flexNone: { flex: 0 },
	grow: { flexGrow: 1 },
	shrink: { flexShrink: 1 },
});
