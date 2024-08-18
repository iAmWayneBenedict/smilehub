import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Select,
	SelectItem,
} from "@nextui-org/react";
import { useAppStore } from "@/store/zustand.js";
import { useEffect, useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Controller, useForm } from "react-hook-form";
import { convertDateYYYYMMDD, isWeekEndDate } from "@/services/api/utils";
import AppointmentsAPIManager from "@/services/api/managers/appointments/AppointmentsAPIManager";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomDatePicker from "@/components/ui/DatePicker";

export default function ReschedModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { newScheduleModal, setNewScheduleModal, setAlertDialogDetails } = useAppStore();
	const [timeDropdownList, setTimeDropdownList] = useState([]);

	const queryClient = useQueryClient();
	useEffect(() => {
		if (newScheduleModal.isOpen) {
			onOpen();
		} else {
			onClose();
		}
	}, [newScheduleModal]);

	// Form hook
	const { handleSubmit, control } = useForm({
		defaultValues: {
			ID: newScheduleModal.ID || "",
			APPOINTMENT_DATE: today(getLocalTimeZone()), // default date (today)
			APPOINTMENT_TIME: "",
		},
	});
	useEffect(() => {
		handleGetDate(today(getLocalTimeZone()), false);
	}, []);

	const handleGetDate = async (date, isForm = true) => {
		if (isWeekEndDate(date)) return;
		try {
			const response = await AppointmentsAPIManager.getAppointmentDates({
				APPOINTMENT_DATE: convertDateYYYYMMDD(date),
			});
			setTimeDropdownList(response.available_times || []);
		} catch (error) {
			if (!isForm)
				setAlertDialogDetails({
					isOpen: true,
					type: "danger",
					title: "Error!",
					message: error.message,
				});
		}
	};
	const mutation = useMutation({
		mutationFn: AppointmentsAPIManager.postRescheduleAppointment,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["getAllAppointments"],
			});

			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: "Appointment schedule changed successfully!",
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
		data.APPOINTMENT_DATE = convertDateYYYYMMDD(data.APPOINTMENT_DATE);
		data.ID = newScheduleModal?.data?.ID;
		mutation.mutate(data);
	};
	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={() => {
					onClose();
					setNewScheduleModal({ isOpen: false });
				}}
				placement="top-center"
				backdrop="blur"
			>
				<ModalContent>
					{(onClose) => (
						<form onSubmit={handleSubmit(onSubmit)}>
							<ModalHeader className="flex flex-col gap-1">
								{newScheduleModal.title}
							</ModalHeader>
							<ModalBody>
								<Controller
									name="APPOINTMENT_DATE"
									control={control}
									rules={{ required: "Date is required" }}
									render={({ field, formState: { errors } }) => (
										<CustomDatePicker
											value={field.value}
											isInvalid={!!errors.APPOINTMENT_DATE}
											errorMessage={errors.APPOINTMENT_DATE?.message}
											setValue={(value) => {
												field.onChange(value);
											}}
											classNames={{
												innerWrapper: "h-12",
											}}
											isDateUnavailable={isWeekEndDate}
											onChange={handleGetDate}
											minValue={today(getLocalTimeZone())}
										/>
									)}
								/>
								<Controller
									name="APPOINTMENT_TIME"
									control={control}
									rules={{ required: "Time is required" }}
									render={({ field, formState: { errors } }) => (
										<Select
											{...field}
											selectedKeys={[field.value]}
											onChange={(selectedKeys) => {
												field.onChange(selectedKeys);
											}}
											isDisabled={!timeDropdownList?.length}
											isInvalid={!!errors.APPOINTMENT_TIME}
											errorMessage={errors.APPOINTMENT_TIME?.message}
											labelPlacement={"outside"}
											placeholder="Select Time"
											label="Time of Visit"
											size="lg"
											variant="bordered"
											color="primary"
											className="w-full bg-white"
											radius="sm"
											classNames={{
												label: "text-darkText font-semibold text-sm pb-1",
												inputWrapper: "h-full",
											}}
										>
											{timeDropdownList.map((time) => (
												<SelectItem key={time} value={time}>
													{time}
												</SelectItem>
											))}
										</Select>
									)}
								/>
							</ModalBody>
							<ModalFooter>
								<Button color="light" variant="flat" onPress={onClose}>
									Close
								</Button>
								<Button
									color="primary"
									type="submit"
									isLoading={mutation.isPending}
								>
									{mutation.isPending ? "Changing..." : "Change"}
								</Button>
							</ModalFooter>
						</form>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
