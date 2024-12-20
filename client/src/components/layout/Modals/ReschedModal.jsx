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
import { convertDateYYYYMMDD, isSunday, isWeekEndDate } from "@/services/api/utils";
import AppointmentsAPIManager from "@/services/api/managers/appointments/AppointmentsAPIManager";
import { useMutation } from "@tanstack/react-query";
import CustomDatePicker from "@/components/ui/DatePicker";
import { useMemo } from "react";
import { parseDate } from "@internationalized/date";
import { formatDate, sortTime } from "@/lib/utils";
import PatientsAPIManager from "@/services/api/managers/patients/PatientsAPIManager";
import { sendEmail } from "@/services/email";

export default function ReschedModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { newScheduleModal, setNewScheduleModal, setAlertDialogDetails } = useAppStore();
	const [timeDropdownList, setTimeDropdownList] = useState([]);
	const [patients, setPatients] = useState([]);

	const todayDate = today("UTC");
	const tomorrow = todayDate.add({ days: 1 });

	useEffect(() => {
		if (newScheduleModal.isOpen) {
			onOpen();

			if (newScheduleModal.data) {
				handleGetSelectedTimes();
				handleGetPatients();
			}
		} else {
			onClose();
		}

		async function handleGetSelectedTimes() {
			await handleGetDate(
				parseDate(convertDateYYYYMMDD(newScheduleModal.data.APPOINTMENT_DATE))
			);
			setTimeDropdownList((prev) => {
				return [...new Set(sortTime(prev, newScheduleModal.data.APPOINTMENT_TIME))];
			});
			reset({
				APPOINTMENT_DATE:
					parseDate(convertDateYYYYMMDD(newScheduleModal.data.APPOINTMENT_DATE)) ||
					tomorrow,
				APPOINTMENT_TIME: newScheduleModal.data.APPOINTMENT_TIME,
			});
		}
	}, [newScheduleModal]);

	// get patients
	const handleGetPatients = async () => {
		try {
			const response = await PatientsAPIManager.getAllPatients();
			setPatients(response);
		} catch (error) {
			setAlertDialogDetails({
				isOpen: true,
				type: "danger",
				title: "Error!",
				message: error.message,
			});
		}
	};

	// Form hook
	const { handleSubmit, control, reset, getValues } = useForm({
		defaultValues: useMemo(() => {
			if (newScheduleModal.data) {
				return {
					APPOINTMENT_DATE:
						parseDate(convertDateYYYYMMDD(newScheduleModal.data.APPOINTMENT_DATE)) ||
						tomorrow,
					APPOINTMENT_TIME: "",
				};
			} else {
				return {
					APPOINTMENT_DATE: tomorrow,
					APPOINTMENT_TIME: "",
				};
			}
		}, [newScheduleModal.isOpen]),
	});
	// useEffect(() => {
	// 	handleGetDate(tomorrow, false);
	// }, []);

	const handleGetDate = async (date, isForm = true) => {
		if (isWeekEndDate(date)) return;
		try {
			const response = await AppointmentsAPIManager.getAppointmentDates({
				APPOINTMENT_DATE: convertDateYYYYMMDD(date),
			});
			setTimeDropdownList([
				...response.available_times,
				newScheduleModal.data.APPOINTMENT_TIME,
			]);
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
			newScheduleModal.refetch();

			const date = formatDate(new Date(convertDateYYYYMMDD(getValues("APPOINTMENT_DATE"))));
			const time = getValues("APPOINTMENT_TIME")?.split("-")[0];

			sendEmail({
				type: "notification",
				name: newScheduleModal.data.FULLNAME,
				email: newScheduleModal.data.EMAIL,

				title: "Appointment Reschedule Confirmation",
				content: `Your appointment has been rescheduled on ${date} at ${time}. Please be at the clinic on or before the given time. `,
			});
			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: "Appointment schedule changed successfully!",
				confirmCallback: () => {
					setNewScheduleModal({});
					onClose();
				},
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
		data.ID = newScheduleModal?.data?.ID;
		mutation.mutate(data);
	};
	return (
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
										isDateUnavailable={isSunday}
										onChange={handleGetDate}
										minValue={tomorrow}
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
							<Button color="primary" type="submit" isLoading={mutation.isPending}>
								{mutation.isPending ? "Changing..." : "Change"}
							</Button>
						</ModalFooter>
					</form>
				)}
			</ModalContent>
		</Modal>
	);
}
