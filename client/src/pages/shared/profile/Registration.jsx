import CustomDatePicker from "@/components/ui/DatePicker";
import { clinicRoles, convertDateYYYYMMDD } from "@/services/api/utils";
import { getLocalTimeZone } from "@internationalized/date";
import { today } from "@internationalized/date";
import { Input, Select, SelectItem, Button } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";

const Registration = () => {
	// Form hook
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			FULLNAME: "",
			BIRTH_DATE: today(getLocalTimeZone()), // default date (today)
			GENDER: "",
			ROLE: "",
			EMAIL: "",
			USERNAME: "",
			PURPOSE: "",
			PASSWORD: "",
			CONFIRM_PASSWORD: "",
		},
	});
	// const mutation = useMutation({
	// 	mutationFn: AppointmentsAPIManager.postPatientAppointment,
	// 	onSuccess: () => {
	// 		setAlertDialogDetails({
	// 			isOpen: true,
	// 			type: "success",
	// 			title: "Success!",
	// 			message: "Appointment booked successfully!",
	// 		});
	// 	},
	// 	onError: (error) => {
	// 		setAlertDialogDetails({
	// 			isOpen: true,
	// 			type: "danger",
	// 			title: "Error!",
	// 			message: error.message,
	// 		});
	// 	},
	// });
	const onSubmit = (data) => {
		// data.APPOINTMENT_DATE = convertDateYYYYMMDD(data.APPOINTMENT_DATE);
		// mutation.mutate(data);
	};
	return (
		<div style={{ flex: 1 }} className="~mx-10/16 mt-10">
			<div style={{ flex: 1 }} className="relative p-4 bg-white">
				<div className="flex flex-row items-center justify-between">
					<div>
						<h1 className="text-2xl font-bold capitalize">Dentists Registration</h1>
					</div>
				</div>
				<br />
				<br />
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col ~gap-1/24 lg:flex-row">
						<div style={{ flex: 1 }} className="flex flex-col gap-5">
							<Input
								{...register("FULLNAME", {
									required: "Full Name is required",
								})}
								isInvalid={!!errors.FULLNAME}
								errorMessage={errors.FULLNAME?.message}
								key={"f_name"}
								type="text"
								label="Full Name"
								size="lg"
								variant="bordered"
								color="primary"
								className="w-full"
								classNames={{
									label: "text-darkText font-semibold ",
									inputWrapper: "rounded-lg h-[4rem] bg-white",
								}}
								placeholder="Full Name"
								labelPlacement={"outside"}
							/>
							<Controller
								name="BIRTH_DATE"
								control={control}
								rules={{ required: "Date of Birth is required" }}
								render={({ field, formState: { errors } }) => (
									<CustomDatePicker
										value={field.value}
										label={"Date of Birth"}
										isInvalid={!!errors.BIRTH_DATE}
										errorMessage={errors.BIRTH_DATE?.message}
										setValue={(value) => {
											field.onChange(value);
										}}
									/>
								)}
							/>
							<Controller
								name="GENDER"
								control={control}
								rules={{ required: "Gender is required" }}
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
										placeholder="Select Gender"
										label="Gender"
										size="lg"
										variant="bordered"
										color="primary"
										radius="sm"
										className="w-full bg-white"
										classNames={{
											label: "text-darkText font-semibold ",
											inputWrapper: "h-full",
											trigger: "h-[4rem]",
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
							<Controller
								name="ROLE"
								control={control}
								rules={{ required: "Role is required" }}
								render={({ field, formState: { errors } }) => (
									<Select
										{...field}
										selectedKeys={[field.value]}
										onChange={(selectedKeys) => {
											field.onChange(selectedKeys);
										}}
										isInvalid={!!errors.ROLE}
										errorMessage={errors.ROLE?.message}
										labelPlacement={"outside"}
										placeholder="Select Role"
										label="Role"
										size="lg"
										variant="bordered"
										color="primary"
										className="w-full bg-white"
										radius="sm"
										classNames={{
											label: "text-darkText font-semibold ",
											inputWrapper: "h-full",
											trigger: "h-[4rem]",
										}}
									>
										{clinicRoles.map((role) => (
											<SelectItem key={role.name} value={role.name}>
												{role.name}
											</SelectItem>
										))}
									</Select>
								)}
							/>
						</div>
						<div style={{ flex: 1 }} className="flex flex-col gap-5">
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
								key={"email"}
								type="text"
								label="Email"
								size="lg"
								variant="bordered"
								color="primary"
								className="w-full"
								classNames={{
									label: "text-darkText font-semibold ",
									inputWrapper: "rounded-lg h-[4rem] bg-white",
								}}
								placeholder="you@gmail.com"
								labelPlacement={"outside"}
							/>
							<Input
								{...register("USERNAME", {
									required: "Username is required",
								})}
								isInvalid={!!errors.USERNAME}
								errorMessage={errors.USERNAME?.message}
								key={"f_name"}
								type="text"
								label="Username"
								size="lg"
								variant="bordered"
								color="primary"
								className="w-full"
								description="Username should be unique"
								classNames={{
									label: "text-darkText font-semibold ",
									inputWrapper: "rounded-lg h-[4rem] bg-white",
								}}
								placeholder="Username"
								labelPlacement={"outside"}
							/>
							<div className="flex flex-col gap-5">
								<Input
									{...register("PASSWORD", {
										required: "Password is required",
									})}
									isInvalid={!!errors.PASSWORD}
									errorMessage={errors.PASSWORD?.message}
									key={"f_name"}
									type="text"
									label="Password"
									size="lg"
									variant="bordered"
									color="primary"
									className="w-full"
									classNames={{
										label: "text-darkText font-semibold ",
										inputWrapper: "rounded-lg h-[4rem] bg-white",
									}}
									placeholder="Password"
									labelPlacement={"outside"}
								/>
								<Input
									{...register("CONFIRM_PASSWORD", {
										required: "Confirm Password is required",
									})}
									isInvalid={!!errors.CONFIRM_PASSWORD}
									errorMessage={errors.CONFIRM_PASSWORD?.message}
									type="text"
									size="lg"
									variant="bordered"
									color="primary"
									className="w-full"
									classNames={{
										label: "text-darkText font-semibold ",
										inputWrapper: "rounded-lg h-[4rem] bg-white",
									}}
									placeholder="Confirm Password"
									labelPlacement={"outside"}
								/>
							</div>
						</div>
					</div>
					<div className="flex justify-end mt-10">
						<Button
							color="primary"
							size="lg"
							className="px-12"
							radius="sm"
							type="submit"
						>
							Save
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Registration;
