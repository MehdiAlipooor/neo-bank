import { InformationCard } from "@/components/organisms/InformationCard";
import { TransferButtons } from "@/components/organisms/TransferButtons";
import { WalletCard } from "@/components/organisms/WalletCard";
import { HomeWalletTemplate } from "@/components/templates/HomeWallet";
import { Layout } from "./layout";

export const HomeScreen = () => {
	return (
		<Layout>
			<HomeWalletTemplate
				walletCardComponent={<WalletCard />}
				infoComponent={<InformationCard />}
			/>
			<TransferButtons />
		</Layout>
	);
};
