export type CardNumberBoxProps = {
	id: string;
	title: string;
	number: string;
	icon: string;

	/**
	 * @default false
	 */
	isActive?: boolean;

	/**
	 * @default 0
	 * @prop 1 disalbes opacity on press
	 * @prop 0 enablbes opacity on press
	 */
	activeOpacity?: 0 | 1;

	/**
	 * @default false
	 */
	hideSelect?: boolean;
};
