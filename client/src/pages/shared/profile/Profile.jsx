import CustomDatePicker from "@/components/ui/DatePicker";
import { clinicRoles } from "@/services/api/utils";
import { getLocalTimeZone } from "@internationalized/date";
import { today } from "@internationalized/date";
import { Tabs, Tab, Image, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PropTypes from "prop-types";

const Profile = () => {
	// controlled tabs
	const [selected, setSelected] = useState("new-appointments");
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
						<Tab key="new-appointments" title="My Profile">
							<ProfileForm isView />
						</Tab>
						<Tab key="completed-appointments" title="Edit Profile">
							<ProfileForm isView={false} />
						</Tab>
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default Profile;

const ProfileForm = ({ isView }) => {
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
	const onSubmit = (data) => {
		// data.APPOINTMENT_DATE = convertDateYYYYMMDD(data.APPOINTMENT_DATE);
		// mutation.mutate(data);
	};
	return (
		<div>
			<form action="">
				<div className="flex flex-col gap-10 xl:flex-row">
					<div
						style={{ flex: 1 }}
						className="flex flex-col items-center justify-center gap-10"
					>
						<div className="mt-10 xl:mt-0">
							<Image
								src="https://i.pravatar.cc/150?u=a04258114e29026702d"
								radius="full"
								className="w-56 h-56"
								removeWrapper
							/>
						</div>

						{!isView ? (
							<div>
								<label
									htmlFor="profile-input"
									className="py-4 text-white rounded-md cursor-pointer px-7 bg-primary"
								>
									Change Profile Picture
								</label>
								<input type="file" id="profile-input" className="hidden" />
							</div>
						) : (
							<div>
								<h1 className="text-3xl font-bold">John Doe</h1>
							</div>
						)}
					</div>
					<div
						style={{ flex: 1 }}
						className="flex flex-col items-center justify-center gap-5 mr-0 lg:mr-16 2xl:mr-64"
					>
						<Controller
							name="BIRTH_DATE"
							control={control}
							rules={{ required: "Date of Birth is required" }}
							render={({ field, formState: { errors } }) => (
								<CustomDatePicker
									isReadOnly={isView}
									value={field.value}
									label={"Date of Birth"}
									isInvalid={!!errors.BIRTH_DATE}
									errorMessage={errors.BIRTH_DATE?.message}
									setValue={(value) => {
										field.onChange(value);
									}}
									maxValue={today(getLocalTimeZone())}
								/>
							)}
						/>
						<Input
							{...register("FULLNAME", {
								required: "Full Name is required",
							})}
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
							<Input
								{...register("GENDER", {
									required: "Gender is required",
								})}
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
										{clinicRoles.map((role) => (
											<SelectItem key={role.name} value={role.name}>
												{role.name}
											</SelectItem>
										))}
									</Select>
								)}
							/>
						) : (
							<Input
								{...register("ROLE", {
									required: "Role is required",
								})}
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
						<Input
							{...register("EMAIL", {
								required: "Email is required",
								pattern: {
									value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
									message: "Invalid email address",
								},
							})}
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
						{isView && (
							<Input
								{...register("PREV_PASSWORD", {
									required: "Previous Password is required",
								})}
								isReadOnly={isView}
								isInvalid={!!errors.PREV_PASSWORD}
								errorMessage={errors.PREV_PASSWORD?.message}
								type="text"
								label={isView ? "New Password" : "Previous Password"}
								size="lg"
								variant="bordered"
								color="primary"
								className="w-full"
								classNames={{
									label: "text-darkText font-semibold ",
									inputWrapper: "rounded-lg h-[4rem] bg-white",
								}}
								placeholder={isView ? "New Password" : "Previous Password"}
								labelPlacement={"outside"}
							/>
						)}
						{!isView && (
							<>
								<Input
									{...register("PREV_PASSWORD", {
										required: "Previous Password is required",
									})}
									isReadOnly={isView}
									isInvalid={!!errors.PREV_PASSWORD}
									errorMessage={errors.PREV_PASSWORD?.message}
									type="text"
									label="Previous Password"
									size="lg"
									variant="bordered"
									color="primary"
									className="w-full"
									classNames={{
										label: "text-darkText font-semibold ",
										inputWrapper: "rounded-lg h-[4rem] bg-white",
									}}
									placeholder="Previous Password"
									labelPlacement={"outside"}
								/>
								<Input
									{...register("PASSWORD", {
										required: "New Password is required",
									})}
									isReadOnly={isView}
									isInvalid={!!errors.PASSWORD}
									errorMessage={errors.PASSWORD?.message}
									type="text"
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
								/>
							</>
						)}
						{!isView && (
							<div>
								<Button color="primary" size="lg" radius="sm" className="py-7">
									Update Information
								</Button>
							</div>
						)}
					</div>
				</div>
			</form>
		</div>
	);
};
ProfileForm.propTypes = {
	isView: PropTypes.bool,
};
