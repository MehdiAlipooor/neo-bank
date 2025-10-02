import { ChevronRightIcon } from "@/components/icons/ChevronRight";
import { themeColors } from "@/constants/theme";
import { ActionIcon } from "../ActionIcon";

export const BackButton = () => {
	return (
		<ActionIcon width={42} height={42} borderColor="#eee">
			<ChevronRightIcon strokeWidth={1.5} color={themeColors.dark} size={24} />
		</ActionIcon>
	);
};
