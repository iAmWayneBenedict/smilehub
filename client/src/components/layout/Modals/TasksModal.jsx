import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,Textarea, Input
} from "@nextui-org/react";
import { useAppStore } from "@/store/zustand.js";
import { useEffect, useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Controller, useForm } from "react-hook-form";
import { convertDateYYYYMMDD, isWeekEndDate } from "@/services/api/utils";
import AppointmentsAPIManager from "@/services/api/managers/appointments/AppointmentsAPIManager";
import { useMutation } from "@tanstack/react-query";
import CustomDatePicker from "@/components/ui/DatePicker";
import { useMemo } from "react";
import { parseDate } from "@internationalized/date";
import { sortTime } from "@/lib/utils";

export default function TasksModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { taskModal, setTaskModal, setAlertDialogDetails } = useAppStore();
	const [timeDropdownList, setTimeDropdownList] = useState([]);
	useEffect(() => {
		if (taskModal.isOpen) {
			onOpen();

			if (taskModal.data) {
			reset({
				TITLE: taskModal?.data?.TITLE,
				DESCRIPTION: taskModal?.data?.DESCRIPTION,
			});
			}
		} else {
			onClose();
		}
	}, [taskModal]);

	// Form hook
	const { handleSubmit, control, reset } = useForm({
		defaultValues: useMemo(() => {
			if (taskModal.data) {
				return {
					TITLE: taskModal?.data?.TITLE,
					DESCRIPTION: taskModal?.data?.TITLE,
				};
			}
		}, [taskModal.isOpen]),
	});
	const mutation = useMutation({
		mutationFn: AppointmentsAPIManager.postRescheduleAppointment,
		onSuccess: () => {
			taskModal.refetch();

			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: "Task added successfully!",
			});

			onClose();
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
//		data.TITLE = convertDateYYYYMMDD(data.TITLE);
//		data.ID = taskModal?.data?.ID;
//		mutation.mutate(data);
	};
	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={() => {
					onClose();
					setTaskModal({ isOpen: false });
					reset()
				}}
				placement="top-center"
				backdrop="blur"
			>
				<ModalContent>
					{(onClose) => (
						<form onSubmit={handleSubmit(onSubmit)}>
							<ModalHeader className="flex flex-col gap-1">
								{taskModal.title}
							</ModalHeader>
							<ModalBody>
								<Controller
									name="TITLE"
									control={control}
									rules={{ required: "Title is required" }}
									render={({ field, formState: { errors } }) => (
										<Input
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											isReadOnly={location.pathname.includes("info")}
											aria-label="title"
											isInvalid={!!errors.TITLE}
											errorMessage={errors.TITLE?.message}
											label={"Title"}
											placeholder={"Add title"}
											type="text"
											variant="bordered"
											color="primary"
											radius="sm"
											size="lg"
											className="w-full"
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper: "h-full bg-white",
											}}
											labelPlacement={"outside"}
										/>
									)}
								/>
								<Controller
									name="DESCRIPTION"
									control={control}
									rules={{ required: "Progress details is required" }}
									render={({ field, formState: { errors } }) => (
										<Textarea
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											isInvalid={!!errors.DESCRIPTION}
											errorMessage={errors.DESCRIPTION?.message}
											variant={"bordered"}
											label="Progress Details"
											radius="sm"
											size="lg"
											color="primary"
											labelPlacement="outside"
											classNames={{
												label: "text-darkText font-semibold text-base",
												inputWrapper:
													"rounded-lg h-full bg-white",
												// mainWrapper: "h-[4rem]",
											}}
											minRows={6}
											placeholder="Progress description"
											className="col-span-12 mb-6 md:col-span-6 md:mb-0"
										/>
									)}
								/>
							</ModalBody>
							<ModalFooter>
								<Button color="light" variant="flat" onPress={() => {
									onClose()
									reset()
									setTaskModal({})
								}}>
									Close
								</Button>
								<Button
									color="primary"
									type="submit"
									isLoading={mutation.isPending}
								>
									{mutation.isPending ? "Loading..." : "Save"}
								</Button>
							</ModalFooter>
						</form>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
