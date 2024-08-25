import {
	Input,
	Select,
	SelectItem,
	Button,
	Breadcrumbs,
	BreadcrumbItem,
	Link,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { getLocalTimeZone, today } from "@internationalized/date";
import CustomDatePicker from "@/components/ui/DatePicker";
import PropTypes from "prop-types";
import { useMutation } from "@tanstack/react-query";
import PatientsAPIManager from "@/services/api/managers/patients/PatientsAPIManager";
import { convertDateYYYYMMDD } from "@/services/api/utils";
import { useAppStore, useAuthTokenPersisted } from "@/store/zustand";
import { decrypt } from "@/lib/utils";

const AddPatient = () => {
	const { setAlertDialogDetails } = useAppStore();
	const { authToken } = useAuthTokenPersisted();
	const userDetails = decrypt(authToken);
	const currentUserType = userDetails?.role?.toLowerCase();
	// Form hook
	const {
		register,
		handleSubmit,
		control,
		reset,
		setError,
		formState: { errors },
	} = useForm({
		defaultValues: {
			FIRSTNAME: "",
			LASTNAME: "",
			EMAIL: "",
			PHONE: "",
			BIRTHDATE: today(getLocalTimeZone()), // default date (today)
			GENDER: "",
		},
	});
	const mutation = useMutation({
		mutationFn: PatientsAPIManager.postAddPatient,
		onSuccess: () => {
			reset();
			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: "Patient added successfully",
				actionLink: `/${currentUserType}/patients`,
			});
		},
		onError: (error) => {
			console.error(error);
			if (error.message === "Email already exists.") {
				setError("EMAIL", {
					type: "manual",
					message: "Email already exists",
				});
			} else
				setAlertDialogDetails({
					isOpen: true,
					type: "danger",
					title: "Error!",
					message: error.message,
				});
		},
	});
	const onSubmit = (data) => {
		data["BIRTHDATE"] = convertDateYYYYMMDD(data["BIRTHDATE"]);
		mutation.mutate(data);
	};
	return (
		<div style={{ flex: 1 }} className="bg-[#f9f9f9]">
			<div className="w-full h-full p-5">
				<h3 className="text-lg font-darkText">
					<Breadcrumbs>
						<BreadcrumbItem href="/admin/patients">Patients</BreadcrumbItem>
						<BreadcrumbItem href="/admin/patients/add">Add Patient</BreadcrumbItem>
					</Breadcrumbs>
				</h3>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-3">
						<div
							style={{ flex: 1 }}
							className="flex items-center justify-between p-4 mt-5 bg-white rounded-lg shadow-md"
						>
							<h3 className="text-2xl font-medium" style={{ flex: 1 }}>
								Add New Patient
							</h3>
							<div className="flex gap-2">
								<Button
									color="primary"
									as={Link}
									href="/admin/patients"
									variant="bordered"
								>
									Cancel
								</Button>
								<Button
									color="primary"
									type="submit"
									isLoading={mutation.isPending}
								>
									{mutation.isPending ? "Saving..." : "Save"}
								</Button>
							</div>
						</div>
						{/* form container */}
						<div className="flex justify-center w-full">
							<div className="w-full max-w-4xl p-6 pt-10 mt-5 bg-white rounded-lg shadow-md">
								<Form register={register} errors={errors} control={control} />
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddPatient;

const Form = ({ register, control, errors }) => {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex">
				<div style={{ flex: 1 }} className="text-darkText">
					Record Number
				</div>
				<div style={{ flex: 3 }} className="text-darkText">
					Record number will be assigned automatically when you save.
				</div>
			</div>
			<div className="flex items-center">
				<div style={{ flex: 1 }} className="text-darkText">
					First name
				</div>
				<div style={{ flex: 3 }}>
					<Input
						{...register("FIRSTNAME", {
							required: "First name is required",
						})}
						isInvalid={!!errors.FIRSTNAME}
						errorMessage={errors.FIRSTNAME?.message}
						key={"f_name"}
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
				</div>
			</div>
			<div className="flex items-center">
				<div style={{ flex: 1 }} className="text-darkText">
					Last name
				</div>
				<div style={{ flex: 3 }}>
					<Input
						{...register("LASTNAME", {
							required: "Last name is required",
						})}
						isInvalid={!!errors.LASTNAME}
						errorMessage={errors.LASTNAME?.message}
						key={"f_name"}
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
				</div>
			</div>
			<div className="flex items-center">
				<div style={{ flex: 1 }} className="text-darkText">
					Date of Birth
				</div>
				<div style={{ flex: 3 }}>
					{/* <DatePicker label="Birth Date" variant="bordered" showMonthAndYearPickers /> */}
					<Controller
						name="BIRTHDATE"
						control={control}
						rules={{ required: "Birthdate is required" }}
						render={({ field, formState: { errors } }) => (
							<CustomDatePicker
								value={field.value}
								isInvalid={!!errors.BIRTHDATE}
								errorMessage={errors.BIRTHDATE?.message}
								setValue={(value) => {
									field.onChange(value);
								}}
								label={""}
								classNames={{
									innerWrapper: "h-full",
								}}
								aria-label="Birth date"
								maxValue={today(getLocalTimeZone())}
								// isDateUnavailable={isDateUnavailable}
								// maxValue={sixMonthsAgo}
							/>
						)}
					/>
				</div>
			</div>
			<div className="flex items-center">
				<div style={{ flex: 1 }} className="text-darkText">
					Gender
				</div>
				<div style={{ flex: 3 }}>
					<Controller
						name="GENDER"
						control={control}
						rules={{ required: "Time is required" }}
						render={({ field, formState: { errors } }) => (
							<Select
								{...field}
								selectedKeys={[field.value]}
								onChange={(selectedKeys) => {
									field.onChange(selectedKeys);
								}}
								isInvalid={!!errors.GENDER}
								errorMessage={errors.GENDER?.message}
								labelPlacement={"outside"}
								size="lg"
								variant="bordered"
								color="primary"
								radius={"sm"}
								className="w-full bg-white max-w-48"
								classNames={{
									label: "text-darkText font-semibold ",
									inputWrapper: "h-full",
								}}
							>
								{["Male", "Female"].map((time) => (
									<SelectItem key={time} value={time}>
										{time}
									</SelectItem>
								))}
							</Select>
						)}
					/>
				</div>
			</div>
			<div className="flex items-center">
				<div style={{ flex: 1 }} className="text-darkText">
					Email
				</div>
				<div style={{ flex: 3 }}>
					<Input
						{...register("EMAIL", {
							required: "Email is required",
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: "Invalid email address",
							},
						})}
						isInvalid={!!errors.EMAIL}
						errorMessage={errors.EMAIL?.message}
						type="text"
						size="lg"
						variant="bordered"
						color="primary"
						radius="sm"
						className="w-full"
						classNames={{
							label: "text-darkText font-semibold ",
							inputWrapper: "h-full bg-white",
						}}
						labelPlacement={"outside"}
					/>
				</div>
			</div>
			<div className="flex items-center">
				<div style={{ flex: 1 }} className="text-darkText">
					Phone Number
				</div>
				<div style={{ flex: 3 }}>
					<Input
						{...register("PHONE", {
							required: "Phone Number is required",
							pattern: {
								value: /^9\d{9}$/,
								message: "Invalid phone number",
							},
						})}
						isInvalid={!!errors.PHONE}
						errorMessage={errors.PHONE?.message}
						labelPlacement="outside"
						type="number"
						size="lg"
						radius="sm"
						variant="bordered"
						color="primary"
						className="w-full"
						classNames={{
							label: "text-darkText font-semibold ",
							inputWrapper: "h-full bg-white",
						}}
						startContent={"+63"}
					/>
				</div>
			</div>
		</div>
	);
};
Form.propTypes = {
	register: PropTypes.func.isRequired,
	control: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};
