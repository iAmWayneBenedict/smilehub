import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Input,
} from "@nextui-org/react";
import { useAppStore } from "@/store/zustand.js";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { convertDateYYYYMMDD } from "@/services/api/utils";
import AppointmentsAPIManager from "@/services/api/managers/appointments/AppointmentsAPIManager";
import { useMutation } from "@tanstack/react-query";
import { Search, Plus } from "lucide-react";
import InventoryAPIManager from "@/services/api/managers/inventory/InventoryAPIManager";
import { useMemo } from "react";

export default function AddGroup() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { addGroupModal, setAddGroupModal, setAlertDialogDetails } = useAppStore();
	useEffect(() => {
		if (addGroupModal.isOpen) {
			onOpen();
		} else {
			onClose();
		}
	}, [addGroupModal]);

	// Form hook
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({
		defaultValues: useMemo(() => {
			if (addGroupModal.data) {
				return {
					NAME: addGroupModal.data.GROUP_NAME,
				};
			} else
				return {
					NAME: "",
				};
		}, [addGroupModal]),
	});
	useEffect(() => {
		if (addGroupModal.data) {
			reset({
				NAME: addGroupModal.data.GROUP_NAME,
			});
		}
	}, [addGroupModal]);
	const mutation = useMutation({
		mutationFn: InventoryAPIManager.postAddGroup,
		onSuccess: () => {
			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: "Group added successfully!",
			});
			addGroupModal?.refetch();
			onClose();
			setAddGroupModal({});
		},
		onError: (error) => {
			setAlertDialogDetails({
				isOpen: true,
				type: "danger",
				title: "Error!",
				message: error.message,
			});
		},
	});
	const updateMutation = useMutation({
		mutationFn: InventoryAPIManager.postEditGroup,
		onSuccess: () => {
			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: "Group updated successfully!",
			});
			addGroupModal?.refetch();
			onClose();
			setAddGroupModal({});
		},
		onError: (error) => {
			setAlertDialogDetails({
				isOpen: true,
				type: "danger",
				title: "Error!",
				message: error.message,
			});
		},
	});
	const onSubmit = (data) => {
		if (addGroupModal.data) {
			updateMutation.mutate({ ...data, ID: addGroupModal.data.ID });
		} else mutation.mutate(data);
	};
	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={() => {
					onClose();
					setAddGroupModal({ isOpen: false });
				}}
				placement="top-center"
				backdrop="blur"
			>
				<ModalContent>
					{(onClose) => (
						<form onSubmit={handleSubmit(onSubmit)}>
							<ModalHeader className="flex flex-col gap-1">
								{addGroupModal.title}
							</ModalHeader>
							<ModalBody>
								<Input
									{...register("NAME", {
										required: "Item is required",
									})}
									isInvalid={!!errors.NAME}
									errorMessage={errors.NAME?.message}
									key={"f_name"}
									type="text"
									size="lg"
									variant="bordered"
									color="primary"
									className="w-full"
									classNames={{
										label: "text-darkText font-semibold ",
										inputWrapper: "rounded-lg h-full bg-white",
										mainWrapper: "h-[4rem]",
									}}
									placeholder="Enter Item Name or Item ID"
									endContent={<Search />}
								/>
							</ModalBody>
							<ModalFooter className="justify-start">
								<Button startContent={<Plus />} color="primary" type="submit">
									{addGroupModal?.data ? "Edit" : "Add"} Group
								</Button>
							</ModalFooter>
						</form>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
