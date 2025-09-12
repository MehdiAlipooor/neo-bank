import { ChevronLeftIcon } from "@/components/icons/ChevronLeft";
import { themeColors } from "@/constants/theme";
import { ActionIcon } from "../ActionIcon";

export const BackButton = () => {
	return (
		<ActionIcon width={42} height={42} borderColor="#eee">
			<ChevronLeftIcon strokeWidth={1.5} color={themeColors.dark} size={24} />
		</ActionIcon>
	);
};
