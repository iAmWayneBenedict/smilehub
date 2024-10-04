import CustomDatePicker from "@/components/ui/DatePicker";
import { convertDateYYYYMMDD, employeeRoles } from "@/services/api/utils";
import { getLocalTimeZone, parseDate } from "@internationalized/date";
import { today } from "@internationalized/date";
import { Tabs, Tab, Button, Input, Select, SelectItem, Avatar } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { Controller, set, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useMutation, useQuery } from "@tanstack/react-query";
import EmployeesAPIManager from "@/services/api/managers/employees/EmployeesAPIManager.js";
import { useParams } from "react-router-dom";
import { useAppStore, useAuthTokenPersisted } from "@/store/zustand.js";
import { Eye, EyeOff } from "lucide-react";
import { decrypt } from "@/lib/utils";

const Profile = () => {
	// controlled tabs
	const [selected, setSelected] = useState("view");
	const [currentDisplay, setCurrentDisplay] = useState("");
	const { authToken } = useAuthTokenPersisted();
	const currentUser = location.pathname.includes("admin") ? "admin" : "staff";
	const user = decrypt(authToken);
	return (
		<div style={{ flex: 1 }} className="px-10 mt-10">
			<div style={{ flex: 1 }} className="relative p-4 bg-white">
				<div>
					<Tabs
						selectedKey={selected}
						onSelectionChange={setSelected}
						variant={"underlined"}
						aria-label="Tabs variants"
						color="primary"
						size="lg"
						classNames={{
							tabContent:
								"group-data-[selected=true]:text-darkText group-data-[selected=true]:font-bold",
						}}
					>
						<Tab key="view" title="Profile">
							<ProfileForm
								isView
								selected={selected}
								setSelected={setSelected}
								setCurrentDisplay={setCurrentDisplay}
							/>
						</Tab>
						{currentDisplay === user.email && currentUser === "staff" && (
							<Tab key="edit" title="Edit Profile">
								<ProfileForm
									isView={false}
									selected={selected}
									setSelected={setSelected}
								/>
							</Tab>
						)}
						{currentUser === "admin" && (
							<Tab key="edit" title="Edit Profile">
								<ProfileForm
									isView={false}
									selected={selected}
									setSelected={setSelected}
								/>
							</Tab>
						)}
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default Profile;

const ProfileForm = ({ isView, selected, setSelected, setCurrentDisplay = () => {} }) => {
	const params = useParams();
	const { setAlertDialogDetails } = useAppStore();

	const onSubmitDetails = (data) => {
		data.BIRTHDAY = convertDateYYYYMMDD(data.BIRTHDAY);
		data.ID = params?.id;
		detailsMutation.mutate(data);
	};
	const { data, isSuccess, isLoading, refetch } = useQuery({
		queryKey: ["employee-detail"],
		queryFn: () =>
			EmployeesAPIManager.getEmployeeDetails({
				ID: params?.id,
			}),
	});

	useEffect(() => {
		if (isSuccess) {
			setCurrentDisplay(data?.EMAIL);
		}
	}, [data, isSuccess]);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
		setError,
	} = useForm({
		defaultValues: useMemo(() => {
			if (!data) {
				return {
					FULLNAME: "",
					BIRTHDAY: today(getLocalTimeZone()), // default date (today)
					GENDER: "",
					ROLE: "",
					EMAIL: "",
				};
			}
			return {
				FULLNAME: data?.FULLNAME,
				BIRTHDAY: data?.BIRTHDAY
					? parseDate(convertDateYYYYMMDD(data?.BIRTHDAY))
					: today(getLocalTimeZone()), // default date (today)
				GENDER: data?.GENDER,
				ROLE: data?.ROLE,
				EMAIL: data?.EMAIL,
			};
		}, [data]),
	});

	const detailsMutation = useMutation({
		mutationFn: EmployeesAPIManager.postUpdateEmployeeInfo,
		onSuccess: (data) => {
			reset();
			refetch();
			const isStaff = location.pathname.includes("staff");
			const isAdmin = location.pathname.includes("admin");

			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: "Employee updated successfully",
				confirmCallback: () => {
					setSelected("view");

					if (isStaff || isAdmin) {
						location.reload();
					}
				},
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

	useEffect(() => {
		if (!isSuccess) return;

		reset({
			FULLNAME: data?.FULLNAME,
			BIRTHDAY: data?.BIRTHDAY
				? parseDate(convertDateYYYYMMDD(data?.BIRTHDAY))
				: today(getLocalTimeZone()), // default date (today)
			GENDER: data?.GENDER,
			ROLE: data?.ROLE,
			EMAIL: data?.EMAIL,
		});
	}, [data, isSuccess]);

	return (
		<div>
			<div className="flex flex-col gap-10 xl:flex-row">
				<div
					style={{ flex: 1 }}
					className="flex flex-col items-center justify-center gap-10"
				>
					<div className="mt-10 xl:mt-0">
						<Avatar src={null} className="w-56 h-56 text-large" />
					</div>

					{isView && (
						<div>
							<h1 className="text-3xl font-bold">{data?.FULLNAME}</h1>
						</div>
					)}
				</div>
				<div style={{ flex: 1 }} className="flex flex-col gap-5">
					<form style={{ flex: 1 }} onSubmit={handleSubmit(onSubmitDetails)}>
						<div
							style={{ flex: 1 }}
							className="flex flex-col items-center justify-center gap-5 mr-0 lg:mr-16 2xl:mr-64"
						>
							<Controller
								name="BIRTHDAY"
								control={control}
								rules={{ required: "Date of Birth is required" }}
								render={({ field, formState: { errors } }) => (
									<CustomDatePicker
										isReadOnly={isView}
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
								name="FULLNAME"
								control={control}
								rules={{ required: "Full name is required" }}
								render={({ field, formState: { errors } }) => (
									<Input
										value={field.value}
										onValueChange={(value) => {
											field.onChange(value);
										}}
										aria-label="Full name"
										isReadOnly={isView}
										isInvalid={!!errors.FULLNAME}
										errorMessage={errors.FULLNAME?.message}
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
								)}
							/>
							{!isView ? (
								<Controller
									name="GENDER"
									control={control}
									rules={{ required: "Gender is required" }}
									render={({ field, formState: { errors } }) => (
										<Select
											{...field}
											isReadOnly={isView}
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
							) : (
								<Controller
									name="GENDER"
									control={control}
									rules={{ required: "Gender is required" }}
									render={({ field, formState: { errors } }) => (
										<Input
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											isReadOnly={isView}
											isInvalid={!!errors.GENDER}
											errorMessage={errors.GENDER?.message}
											type="text"
											label="Gender"
											size="lg"
											variant="bordered"
											color="primary"
											className="w-full"
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper: "rounded-lg h-[4rem] bg-white",
											}}
											placeholder="Gender"
											labelPlacement={"outside"}
										/>
									)}
								/>
							)}
							{!isView ? (
								<Controller
									name="ROLE"
									control={control}
									rules={{ required: "Role is required" }}
									render={({ field, formState: { errors } }) => (
										<Select
											{...field}
											isReadOnly={isView}
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
											{employeeRoles.map((role) => (
												<SelectItem key={role.name} value={role.name}>
													{role.name}
												</SelectItem>
											))}
										</Select>
									)}
								/>
							) : (
								<Controller
									name="ROLE"
									control={control}
									rules={{ required: "Role is required" }}
									render={({ field, formState: { errors } }) => (
										<Input
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											isReadOnly={isView}
											isInvalid={!!errors.ROLE}
											errorMessage={errors.ROLE?.message}
											type="text"
											label="Role"
											size="lg"
											variant="bordered"
											color="primary"
											className="w-full"
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper: "rounded-lg h-[4rem] bg-white",
											}}
											placeholder="Role"
											labelPlacement={"outside"}
										/>
									)}
								/>
							)}
							<Controller
								name="EMAIL"
								control={control}
								rules={{
									required: "Email is required",
									pattern: {
										value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
										message: "Invalid email address",
									},
								}}
								render={({ field, formState: { errors } }) => (
									<Input
										value={field.value}
										onValueChange={(value) => {
											field.onChange(value);
										}}
										isReadOnly={isView}
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
								)}
							/>

							{!isView && (
								<div>
									<Button
										type={"submit"}
										color="primary"
										size="lg"
										radius="sm"
										className="py-7"
										isLoading={detailsMutation.isPending}
									>
										{detailsMutation.isPending
											? "Changing..."
											: "Update Information"}
									</Button>
								</div>
							)}
						</div>
					</form>
					<PasswordResetComponent
						isView={isView}
						selected={selected}
						setSelected={setSelected}
						refetch={refetch}
					/>
				</div>
			</div>
		</div>
	);
};
ProfileForm.propTypes = {
	isView: PropTypes.bool,
	selected: PropTypes.any,
	setSelected: PropTypes.any,
	setCurrentDisplay: PropTypes.any,
};

const PasswordResetComponent = ({ isView, selected, setSelected, refetch }) => {
	const params = useParams();
	const { setAlertDialogDetails } = useAppStore();
	const [isVisiblePassword, setIsVisiblePassword] = useState(false);
	const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState(false);

	const toggleVisibilityPassword = () => setIsVisiblePassword(!isVisiblePassword);
	const toggleVisibilityConfirmPassword = () =>
		setIsVisibleConfirmPassword(!isVisibleConfirmPassword);

	const onSubmit = (data) => {
		data.BIRTHDAY = convertDateYYYYMMDD(data.BIRTHDAY);
		data.ID = params?.id;
		mutation.mutate(data);
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setError,
	} = useForm({
		defaultValues: {
			PREVIOUS_PASSWORD: "",
			NEW_PASSWORD: "",
		},
	});

	const mutation = useMutation({
		mutationFn: EmployeesAPIManager.postUpdateEmployeePassword,
		onSuccess: (data) => {
			reset();
			refetch();
			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: "Password changed successfully",
				confirmCallback: () => {
					setSelected("view");
				},
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

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div
				style={{ flex: 1 }}
				className="flex flex-col items-center justify-center gap-5 mr-0 lg:mr-16 2xl:mr-64"
			>
				{!isView && (
					<>
						<Input
							{...register("PREVIOUS_PASSWORD", {
								required: "Previous Password is required",
							})}
							isReadOnly={isView}
							isInvalid={!!errors.PREVIOUS_PASSWORD}
							errorMessage={errors.PREVIOUS_PASSWORD?.message}
							type={isVisiblePassword ? "text" : "password"}
							label="Previous Password"
							size="lg"
							variant="bordered"
							color="primary"
							className="w-full"
							classNames={{
								label: "text-darkText font-semibold ",
								inputWrapper: "rounded-lg h-[4rem] bg-white",
							}}
							endContent={
								<button
									className="focus:outline-none"
									type="button"
									onClick={toggleVisibilityPassword}
									aria-label="toggle password visibility"
								>
									{isVisiblePassword ? (
										<Eye className="text-2xl pointer-events-none text-default-400" />
									) : (
										<EyeOff className="text-2xl pointer-events-none text-default-400" />
									)}
								</button>
							}
							placeholder="Previous Password"
							labelPlacement={"outside"}
						/>
						<Input
							{...register("NEW_PASSWORD", {
								required: "New Password is required",
							})}
							isReadOnly={isView}
							isInvalid={!!errors.NEW_PASSWORD}
							errorMessage={errors.NEW_PASSWORD?.message}
							type={isVisibleConfirmPassword ? "text" : "password"}
							size="lg"
							variant="bordered"
							color="primary"
							className="w-full"
							classNames={{
								label: "text-darkText font-semibold ",
								inputWrapper: "rounded-lg h-[4rem] bg-white",
							}}
							placeholder="New Password"
							labelPlacement={"outside"}
							endContent={
								<button
									className="focus:outline-none"
									type="button"
									onClick={toggleVisibilityConfirmPassword}
									aria-label="toggle password visibility"
								>
									{isVisibleConfirmPassword ? (
										<Eye className="text-2xl pointer-events-none text-default-400" />
									) : (
										<EyeOff className="text-2xl pointer-events-none text-default-400" />
									)}
								</button>
							}
						/>
					</>
				)}
				{!isView && (
					<div>
						<Button
							type={"submit"}
							color="primary"
							size="lg"
							radius="sm"
							className="py-7"
						>
							Change Password
						</Button>
					</div>
				)}
			</div>
		</form>
	);
};

PasswordResetComponent.propTypes = {
	isView: PropTypes.bool,
	selected: PropTypes.any,
	setSelected: PropTypes.any,
};
