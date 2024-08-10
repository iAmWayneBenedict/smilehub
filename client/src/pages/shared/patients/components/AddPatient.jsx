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
import { useLocale } from "@react-aria/i18n";
import { isWeekend } from "@internationalized/date";

const AddPatient = () => {
	return (
		<div style={{ flex: 1 }} className="bg-[#f9f9f9]">
			<div className="w-full h-full p-5">
				<h3 className="text-lg font-darkText">
					<Breadcrumbs>
						<BreadcrumbItem href="/admin/patients">Patients</BreadcrumbItem>
						<BreadcrumbItem href="/admin/patients/add">Add Patient</BreadcrumbItem>
					</Breadcrumbs>
				</h3>
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
							<Button color="primary">Save</Button>
						</div>
					</div>
					{/* form container */}
					<div className="flex justify-center w-full">
						<div className="w-full max-w-4xl p-6 pt-10 mt-5 bg-white rounded-lg shadow-md">
							<Form />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddPatient;

const Form = () => {
	// Form hook
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			fore_name: "",
			last_name: "",
			email: "",
			phone_number: "",
			date: today(getLocalTimeZone()), // default date (today)
			time: "",
			purpose: "",
		},
	});
	const onSubmit = (data) => console.log(data);

	// prepare disabled dates
	let now = today(getLocalTimeZone());
	const sixMonthsAgo = now.add({ months: -6 });
	let disabledRanges = [[now, sixMonthsAgo]];

	let { locale } = useLocale();

	// check if date is unavailable
	let isDateUnavailable = (date) =>
		isWeekend(date, locale) ||
		disabledRanges.some((range) => date >= range[0] && date <= range[1]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
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
					Forename
				</div>
				<div style={{ flex: 3 }}>
					<Input
						{...register("fore_name", {
							required: "Forename is required",
						})}
						isInvalid={!!errors.fore_name}
						errorMessage={errors.fore_name?.message}
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
					Surname
				</div>
				<div style={{ flex: 3 }}>
					<Input
						{...register("surname", {
							required: "Surname is required",
						})}
						isInvalid={!!errors.surname}
						errorMessage={errors.surname?.message}
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
					<Controller
						name="date"
						control={control}
						rules={{ required: "Date is required" }}
						render={({ field, formState: { errors } }) => (
							<CustomDatePicker
								value={field.value}
								isInvalid={!!errors.date}
								errorMessage={errors.date?.message}
								setValue={(value) => {
									field.onChange(value);
								}}
								label={""}
								showTimeSelect={false}
								classNames={{
									innerWrapper: "h-full",
								}}
								aria-label="Appointment date"
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
						name="time"
						control={control}
						rules={{ required: "Time is required" }}
						render={({ field, formState: { errors } }) => (
							<Select
								{...field}
								selectedKeys={[field.value]}
								onChange={(selectedKeys) => {
									field.onChange(selectedKeys);
								}}
								isInvalid={!!errors.time}
								errorMessage={errors.time?.message}
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
						{...register("email", {
							required: "Email is required",
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: "Invalid email address",
							},
						})}
						isInvalid={!!errors.email}
						errorMessage={errors.email?.message}
						key={"email"}
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
						{...register("phone_number", {
							required: "Phone Number is required",
						})}
						isInvalid={!!errors.phone_number}
						errorMessage={errors.phone_number?.message}
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
						startContent={
							<div className="flex items-center">
								<label className="sr-only" htmlFor="country">
									Country
								</label>
								<select
									className="bg-transparent border-0 outline-none text-default-400 text-small"
									id="country"
									name="country"
								>
									<option>PH</option>
									<option>US</option>
									<option>EU</option>
								</select>
							</div>
						}
					/>
				</div>
			</div>
		</form>
	);
};
