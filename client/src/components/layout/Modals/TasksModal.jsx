import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Textarea,
	Input,
	SelectItem,
	Select,
} from "@nextui-org/react";
import { useAppStore, useAuthTokenPersisted } from "@/store/zustand.js";
import { useEffect, useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Controller, useForm } from "react-hook-form";
import { convertDateYYYYMMDD, isWeekEndDate } from "@/services/api/utils";
import AppointmentsAPIManager from "@/services/api/managers/appointments/AppointmentsAPIManager";
import { useMutation } from "@tanstack/react-query";
import CustomDatePicker from "@/components/ui/DatePicker";
import { useMemo } from "react";
import { parseDate } from "@internationalized/date";
import { decrypt, sortTime } from "@/lib/utils";
import TasksAPIManager from "@/services/api/managers/task/TasksAPIManager";

export default function TasksModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { taskModal, setTaskModal, setAlertDialogDetails } = useAppStore();
	const [timeDropdownList, setTimeDropdownList] = useState([]);

	const { authToken } = useAuthTokenPersisted();

	const user = decrypt(authToken);
	useEffect(() => {
		console.log(taskModal);
		if (taskModal.isOpen) {
			onOpen();

			if (taskModal.data) {
				reset(taskModal.data);
			}
		} else {
			onClose();
		}
	}, [taskModal]);

	// Form hook
	const { handleSubmit, control, reset } = useForm({
		defaultValues: useMemo(() => {
			if (taskModal.data) {
				return taskModal.data;
			} else {
				return {
					TITLE: "",
					STATUS: "Pending",
					DESCRIPTION: "",
				};
			}
		}, [taskModal.isOpen]),
	});
	const onSuccess = () => {
		taskModal?.refetch();
		taskModal?.confirmCallback && taskModal?.confirmCallback();

		setAlertDialogDetails({
			isOpen: true,
			type: "success",
			title: "Success!",
			message: "Task added successfully!",
		});

		onClose();
	};
	const onError = (error) => {
		setAlertDialogDetails({
			isOpen: true,
			type: "danger",
			title: "Error!",
			message: error.message,
		});
	};
	const mutation = useMutation({
		mutationFn: TasksAPIManager.postAddTask,
		onSuccess,
		onError,
	});
	const updateMutation = useMutation({
		mutationFn: TasksAPIManager.postEditTask,
		onSuccess,
		onError,
	});
	const onSubmit = (data) => {
		if (taskModal.data)
			updateMutation.mutate({
				...data,
				ID: taskModal.data.ID,
			});
		else
			mutation.mutate({
				...data,
				CREATOR: user?.fullname,
				CREATOR_EMAIL: user?.email,
			});
	};
	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={() => {
					onClose();
					setTaskModal({});
					reset({
						TITLE: "",
						STATUS: "Pending",
						DESCRIPTION: "",
					});
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
									name="STATUS"
									control={control}
									rules={{ required: "Status is required" }}
									render={({ field, formState: { errors } }) => (
										<Select
											{...field}
											aria-label="Status Select"
											selectedKeys={[field.value]}
											onChange={(selectedKeys) => {
												field.onChange(selectedKeys);
											}}
											disallowEmptySelection
											textValue="Status"
											isInvalid={!!errors.STATUS}
											errorMessage={errors.STATUS?.message}
											labelPlacement={"outside"}
											placeholder="Select Status"
											label="Status"
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
											{statusItems.map((item) => (
												<SelectItem
													key={item}
													value={item}
													textValue={item}
												>
													{item}
												</SelectItem>
											))}
										</Select>
									)}
								/>
								<Controller
									name="DESCRIPTION"
									control={control}
									rules={{ required: "Description is required" }}
									render={({ field, formState: { errors } }) => (
										<Textarea
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											isInvalid={!!errors.DESCRIPTION}
											errorMessage={errors.DESCRIPTION?.message}
											variant={"bordered"}
											label="Description"
											radius="sm"
											size="lg"
											color="primary"
											labelPlacement="outside"
											classNames={{
												label: "text-darkText font-semibold text-base",
												inputWrapper: "rounded-lg h-full bg-white",
												// mainWrapper: "h-[4rem]",
											}}
											minRows={6}
											placeholder="Description"
											className="col-span-12 mb-6 md:col-span-6 md:mb-0"
										/>
									)}
								/>
							</ModalBody>
							<ModalFooter>
								<Button
									color="light"
									variant="flat"
									onPress={() => {
										onClose();
										reset();
										setTaskModal({});
									}}
								>
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

const statusItems = [
	"Pending",
	"On-going",
	"Completed",
	"Cancelled",
	"On Hold",
	"Urgent",
	"Overdue",
];
