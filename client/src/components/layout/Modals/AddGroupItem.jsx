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

export default function AddGroupItem() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { addGroupItemModal, setAddGroupItemModal, setAlertDialogDetails } = useAppStore();
	useEffect(() => {
		if (addGroupItemModal.isOpen) {
			onOpen();
		} else {
			onClose();
		}
	}, [addGroupItemModal]);

	// Form hook
	const {
		register,
		formState: { errors },
	} = useForm({
		defaultValues: {
			ITEM: "",
		},
	});
	const mutation = useMutation({
		mutationFn: AppointmentsAPIManager.postPatientAppointment,
		onSuccess: () => {
			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: "Appointment schedule changed successfully!",
			});
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
		data.APPOINTMENT_DATE = convertDateYYYYMMDD(data.APPOINTMENT_DATE);
		mutation.mutate(data);
	};
	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				onClose();
				setAddGroupItemModal({ isOpen: false });
			}}
			placement="center"
			backdrop="blur"
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							{addGroupItemModal.title}
						</ModalHeader>
						<ModalBody>
							<Input
								{...register("ITEM", {
									required: "Item is required",
								})}
								isInvalid={!!errors.ITEM}
								errorMessage={errors.ITEM?.message}
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
							<Button startContent={<Plus />} color="primary" onPress={onClose}>
								Add Item to the Group
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
