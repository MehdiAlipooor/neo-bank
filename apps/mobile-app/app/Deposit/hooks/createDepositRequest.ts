import { useMutation, useQueryClient } from "@tanstack/react-query";
import { initDeposit } from "@/services/deposit.service";

export const useCreateDepositRequest = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => initDeposit(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
		onError: (err: any) => {
			console.error("Failed to create deposit:", err);
		},
	});
};
