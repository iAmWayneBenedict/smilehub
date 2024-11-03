import CustomDatePicker from "@/components/ui/DatePicker";
import EmployeesAPIManager from "@/services/api/managers/employees/EmployeesAPIManager";
import { convertDateYYYYMMDD } from "@/services/api/utils";
import { useAppStore } from "@/store/zustand";
import { getLocalTimeZone } from "@internationalized/date";
import { today } from "@internationalized/date";
import { Input, Select, SelectItem, Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { sendEmail } from "@/services/email/index.js";

const Registration = () => {
	const { setAlertDialogDetails } = useAppStore();
	const currentUser = location.pathname.includes("admin") ? "admin" : "staff";
	// Form hook
	const {
		register,
		handleSubmit,
		watch,
		control,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: {
			FULLNAME: "",
			BIRTHDAY: today(getLocalTimeZone()), // default date (today)
			GENDER: "",
			EMAIL: "",
			PASSWORD: "",
			CONFIRM_PASSWORD: "",
		},
	});
	const mutation = useMutation({
		mutationFn: EmployeesAPIManager.postAddEmployee,
		onSuccess: () => {
			sendEmail({
				type: "credentials",
				name: getValues("FULLNAME"),
				email: getValues("EMAIL"),
				password: getValues("PASSWORD"),
			});
			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: "Employee added successfully!",
				actionLink: `/${currentUser}/employees`,
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
		data.BIRTHDAY = convertDateYYYYMMDD(data.BIRTHDAY);
		mutation.mutate(data);
	};
	return (
		<div style={{ flex: 1 }} className="mx-2 sm:mx-5 lg:~mx-10/16 mt-10">
			<div style={{ flex: 1 }} className="relative p-4 bg-white">
				<div className="flex flex-row items-center justify-between">
					<div>
						<h1 className="text-2xl font-bold capitalize">Employees Registration</h1>
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
								name="BIRTHDAY"
								control={control}
								rules={{ required: "Date of Birth is required" }}
								render={({ field, formState: { errors } }) => (
									<CustomDatePicker
										value={field.value}
										label={"Date of Birth"}
										isInvalid={!!errors.BIRTHDAY}
										errorMessage={errors.BIRTHDAY?.message}
										setValue={(value) => {
											field.onChange(value);
										}}
										maxValue={today(getLocalTimeZone())}
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

							<div className="flex flex-col gap-5">
								<Input
									{...register("PASSWORD", {
										required: "Password is required",
										pattern: {
											value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // regex pattern for password
											message:
												"Password must be at least 8 characters long, contain at least one uppercase, lowercase, number and special character",
										},
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
										pattern: {
											value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // regex pattern for password
											message:
												"Password must be at least 8 characters long, contain at least one uppercase, lowercase, number and special character",
										},
										validate: (value) => {
											if (value !== watch("PASSWORD"))
												return "Passwords do not match";
										},
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
