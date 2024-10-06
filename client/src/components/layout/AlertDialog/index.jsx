import { useAppStore } from "@/store/zustand";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Divider,
} from "@nextui-org/react";
import { useEffect } from "react";
import { CircleCheckBig, CircleX, CircleAlert, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

/**
 * AlertDialog component that displays a modal with different statuses based on the context.
 * It uses the `useAppStore` hook to get details about the alert dialog,
 * and `useDisclosure` hook to manage its open/close state.
 *
 * The modal's appearance and behavior are determined by the `alertDialogDetails` context.
 * It supports success, error, warning, and info statuses, each with its own styling and icon.
 *
 * @returns {JSX.Element} A modal component that displays an alert dialog.
 */
const AlertDialog = () => {
	const { alertDialogDetails } = useAppStore();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const navigate = useNavigate();
	useEffect(() => {
		if (alertDialogDetails?.isOpen) {
			onOpen();
		} else {
			onClose();
		}
	}, [alertDialogDetails]);

	const status = {
		success: {
			title: "Success!",
			bg: "bg-green-500/5",
			icon: <CircleCheckBig className="w-16 h-16 text-green-500" />,
		},
		danger: {
			title: "Danger!",
			bg: "bg-red-500/5",
			icon: <CircleX className="w-16 h-16 text-red-500" />,
		},
		warning: {
			title: "Warning!",
			bg: "bg-yellow-500/5",
			icon: <CircleAlert className="w-16 h-16 text-yellow-500" />,
		},
		info: {
			title: "Info!",
			bg: "bg-blue-500/5",
			icon: <Info className="w-16 h-16 text-blue-500" />,
		},
	};

	return (
		<Modal
			backdrop={"blur"}
			isOpen={isOpen}
			onClose={() => {
				if (alertDialogDetails?.actionLink) {
					navigate(alertDialogDetails?.actionLink);
				}
				if (
					alertDialogDetails?.dialogType !== "confirm" &&
					alertDialogDetails?.confirmCallback
				) {
					alertDialogDetails?.confirmCallback();
				}
				onClose();
			}}
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader
							className={cn(
								"flex flex-col gap-1 py-6",
								status[alertDialogDetails?.type]?.bg
							)}
						>
							<div className="flex flex-col items-center gap-3">
								{status[alertDialogDetails?.type]?.icon}
								<h2 className="~text-lg/2xl">
									{alertDialogDetails?.title ||
										status[alertDialogDetails?.type]?.title}
								</h2>
							</div>
						</ModalHeader>
						<Divider />
						<ModalBody className="mt-5">
							{Array.isArray(alertDialogDetails?.message) ? (
								alertDialogDetails?.message?.map((message, index) => (
									<p key={index} className="text-center">
										{message || "Something went wrong!"}
									</p>
								))
							) : (
								<p className="text-center">
									{alertDialogDetails?.message || "Something went wrong!"}
								</p>
							)}
						</ModalBody>
						<ModalFooter>
							{alertDialogDetails?.dialogType !== "confirm" ? (
								<Button
									color="default"
									variant="light"
									onPress={() => {
										if (alertDialogDetails?.actionLink) {
											navigate(alertDialogDetails?.actionLink);
										}
										if (alertDialogDetails?.confirmCallback) {
											alertDialogDetails?.confirmCallback();
										}
										onClose();
									}}
								>
									Close
								</Button>
							) : (
								<>
									<Button
										color="default"
										variant="light"
										onPress={() => {
											if (alertDialogDetails?.cancelCallback) {
												alertDialogDetails?.cancelCallback();
											}
											onClose();
										}}
									>
										Cancel
									</Button>
									<Button
										color={
											alertDialogDetails?.type === "info"
												? "primary"
												: alertDialogDetails?.type
										}
										variant="solid"
										onPress={() => {
											if (alertDialogDetails?.confirmCallback) {
												alertDialogDetails?.confirmCallback();
											}
											if (alertDialogDetails?.actionLink) {
												navigate(alertDialogDetails?.actionLink);
											}
											onClose();
										}}
									>
										Confirm
									</Button>
								</>
							)}
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default AlertDialog;
