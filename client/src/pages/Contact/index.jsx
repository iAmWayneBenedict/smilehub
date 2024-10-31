import SectionHeader from "@/components/layout/patient/components/SectionHeader";
import ContainerWrapper from "@/components/layout/wrappers/ContainerWrapper";
import officeTimings from "../../assets/icons/time 1.png";
import emailAddress from "../../assets/icons/pin 1.png";
import phoneNumber from "../../assets/icons/telephone 1.png";
import "../style/main.css";
import { Image, Input, Select, SelectItem, Button } from "@nextui-org/react";
import CustomDatePicker from "@/components/ui/DatePicker";
import FAQ from "@/components/layout/patient/FAQ";
import { useForm, Controller } from "react-hook-form";
import { getLocalTimeZone, today } from "@internationalized/date";
import AppointmentsAPIManager from "@/services/api/managers/appointments/AppointmentsAPIManager";
import { convertDateYYYYMMDD, isWeekEndDate } from "@/services/api/utils";
import { useAppStore, useAuthTokenPersisted } from "@/store/zustand";
import { useState } from "react";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { decrypt, formatDate } from "@/lib/utils";
import { useMemo } from "react";
import { sendEmail } from "@/services/email/index.js";

const contactAddressCard = [
	{
		icon: officeTimings,
		title: "Address",
		description: "Monday - Saturday (9:00am to 5pm) Sunday (Closed)",
	},
	{
		icon: emailAddress,
		title: "Email Address",
		description: "bajardentalclinic@gmail.com",
	},
	{
		icon: phoneNumber,
		title: "Phone Number",
		description: "0900-786-9701",
	},
];
const purpose = [
	"Extraction",
	"Oral Prophylaxis",
	"Temporary Filling",
	"Pit & Fissure Sealant",
	"Flouride Treatment",
	"Root Canal Therapy",
	"Impaction/Surgery",
	"Inlay",
	"Stainless Steel Crown",
	"Retainer",
	"Retainer w/ pontics",
	"Denture Repair",
	"Rebase",
	"Reline",
	"X-Rax",
	"Laminates",
	"Jacket Crown/Bridge",
	"Bleaching",
	"Otho-Braces",
	"Mayobrace/Trainer for kids",
	"Veneer",
	"Denture",
	"Fixed Bridge"
];

const Contact = () => {
	const { setAlertDialogDetails } = useAppStore();
	const [timeDropdownList, setTimeDropdownList] = useState([]);
	const { authToken } = useAuthTokenPersisted();
	const user = decrypt(authToken);
	const navigate = useNavigate();
	//	const [tempData, setTempData] =
	// Form hook
	const {
		register,
		handleSubmit,
		control,
		setError,
		reset,
		getValues,
		formState: { errors },
	} = useForm(
		useMemo(() => {
			return {
				defaultValues: {
					FULLNAME: user?.fullname || "",
					EMAIL: user?.email || "",
					PHONE: "",
					APPOINTMENT_DATE: today(getLocalTimeZone()), // default date (today)
					APPOINTMENT_TIME: "",
					PURPOSE: "",
				},
			};
		}, [user])
	);
	useEffect(() => {
		handleGetDate(today(getLocalTimeZone()), false);
	}, []);
	useEffect(() => {
		if (!user) return;
		reset({
			FULLNAME: user?.fullname || "",
			EMAIL: user?.email || "",
			PHONE: "",
			APPOINTMENT_DATE: today(getLocalTimeZone()), // default date (today)
			APPOINTMENT_TIME: "",
			PURPOSE: "",
		});
	}, []);
	const handleGetDate = async (date, isForm = true) => {
		if (isWeekEndDate(date)) return;
		try {
			const response = await AppointmentsAPIManager.getAppointmentDates({
				APPOINTMENT_DATE: convertDateYYYYMMDD(date),
			});
			setTimeDropdownList(response.available_times);
		} catch (error) {
			if (!isForm)
				setAlertDialogDetails({
					isOpen: true,
					type: "danger",
					title: "Error!",
					message: error.message,
				});
			setError("APPOINTMENT_DATE", { type: "manual", message: error.message });
		}
	};
	const mutation = useMutation({
		mutationFn: AppointmentsAPIManager.postPatientAppointment,
		onSuccess: (data) => {
			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: "Appointment booked successfully!",
				actionLink: "/", // redirect to home page
			});
			const date = formatDate(new Date(convertDateYYYYMMDD(getValues("APPOINTMENT_DATE"))));
			const time = getValues("APPOINTMENT_TIME")?.split("-")[0];
			sendEmail({
				type: "notification",
				name: getValues("FULLNAME"),
				email: getValues("EMAIL"),

				title: "Appointment Confirmation",
				content: `Your appointment has been set on ${date} at ${time}. Please be at the clinic on or before the given time. `,
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
		mutation.mutate(data);
	};
	return (
		<>
			<div id="banner-pages">
				<ContainerWrapper>
					<div className="flex flex-col items-center justify-center mt-36">
						<SectionHeader
							textUnderlined="Get in touch"
							description="Ready to Take the Next Step? Book Now. "
							customUnderlineOptions={{
								isLarge: true,
								classes: "w-[105%]",
							}}
						/>
					</div>
					<div className="flex flex-col lg:flex-row ~gap-12/24 ~mx-2/12 mt-24">
						<div style={{ flex: 5 }} className="flex flex-col gap-4">
							<div className="overflow-hidden border-2 w-full rounded-lg border-[#25b4f8]">
								<iframe
									src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d123410.16470318209!2d120.73229478019636!3d14.849504021368226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x339653d1f49646f9%3A0x4ef570235fe479c6!2sPaseo%20del%20Congreso%20St%2C%20Malolos%2C%203000%20Bulacan!3m2!1d14.849518699999999!2d120.81469659999999!5e0!3m2!1sen!2sph!4v1730034506716!5m2!1sen!2sph"
									className="w-full h-96"
									style={{ border: 0 }}
									allowFullScreen=""
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
								/>
							</div>
							<div className="flex flex-col gap-4">
								{contactAddressCard.map((card, index) => (
									<div
										key={index}
										id="address-card"
										className="flex items-center gap-4 px-8 bg-white shadow-lg h-28 rounded-xl"
									>
										<div className="p-3 rounded-full bg-primary w-fit h-fit">
											<Image
												src={card.icon}
												className="w-6"
												alt="Office Timings"
												aria-label="bg"
											/>
										</div>
										<div className="flex flex-col">
											<h4 className="~text-lg/xl font-semibold text-[--dark-text]">
												{card.title}
											</h4>
											<span className="text-secondaryText max-w-64 ~text-sm/base">
												{card.description}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
						<div style={{ flex: 7 }}>
							<div className="border-2 rounded-lg border-[#25b4f8] p-5 md:p-10">
								<form
									onSubmit={(e) => {
										e.preventDefault();
										if (!authToken) {
											navigate("/login");
											return;
										}
										handleSubmit(onSubmit)();
									}}
									className="flex flex-col gap-6"
								>
									<div className="flex flex-row gap-5">
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
												inputWrapper: "rounded-lg h-full bg-white",
												mainWrapper: "h-[4rem]",
											}}
											placeholder="Full Name"
											labelPlacement={"outside"}
											readOnly
										/>
										{/* <Input
											{...register("last_name", {
												required: "Last Name is required",
											})}
											isInvalid={!!errors.last_name}
											errorMessage={errors.last_name?.message}
											key={"l_name"}
											type="text"
											label="Last Name"
											size="lg"
											variant="bordered"
											color="primary"
											className="w-full"
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper: "rounded-lg h-full bg-white",
												mainWrapper: "h-[4rem]",
											}}
											placeholder="Last Name"
											labelPlacement={"outside"}
										/> */}
									</div>
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
											inputWrapper: "rounded-lg h-full bg-white",
											mainWrapper: "h-[4rem]",
										}}
										placeholder="you@gmail.com"
										labelPlacement={"outside"}
										readOnly
									/>
									<Input
										{...register("PHONE", {
											required: "Phone Number is required",
											pattern: {
												value: /^[+069](\d{9}|\d{10}|\d{11}|\d{12})$/,
												message: "Invalid phone number",
											},
										})}
										isInvalid={!!errors.PHONE}
										errorMessage={errors.PHONE?.message}
										label="Phone Number"
										placeholder="900-000-0000"
										labelPlacement="outside"
										type="number"
										size="lg"
										variant="bordered"
										color="primary"
										className="w-full"
										classNames={{
											label: "text-darkText font-semibold ",
											inputWrapper: "rounded-lg h-[4rem] bg-white",
											mainWrapper: "max-h-[4rem]",
										}}
										startContent={"+63"}
									/>
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
												aria-label="select-date"
												onChange={handleGetDate}
												minValue={today(getLocalTimeZone())}
												isDateUnavailable={isWeekEndDate}
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
												isDisabled={!timeDropdownList.length}
												isInvalid={!!errors.APPOINTMENT_TIME}
												errorMessage={errors.APPOINTMENT_TIME?.message}
												labelPlacement={"outside"}
												placeholder="Select Time"
												label="Time of Visit"
												size="lg"
												variant="bordered"
												color="primary"
												aria-label="select-time"
												className="w-full bg-white"
												classNames={{
													label: "text-darkText font-semibold ",
													inputWrapper: "rounded-lg h-full",
													trigger: "h-[4rem]",
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
									<Controller
										name="PURPOSE"
										control={control}
										rules={{ required: "Time is required" }}
										render={({ field, formState: { errors } }) => (
											<Select
												{...field}
												selectedKeys={[field.value]}
												onChange={(selectedKeys) => {
													field.onChange(selectedKeys);
												}}
												isInvalid={!!errors.PURPOSE}
												errorMessage={errors.PURPOSE?.message}
												labelPlacement={"outside"}
												placeholder="Select Purpose"
												label="Purpose of Visit"
												aria-label="purpose"
												size="lg"
												variant="bordered"
												color="primary"
												className="w-full bg-white"
												classNames={{
													label: "text-darkText font-semibold ",
													inputWrapper: "rounded-lg h-full",
													trigger: "h-[4rem]",
												}}
											>
												{purpose.map((time) => (
													<SelectItem key={time} value={time}>
														{time}
													</SelectItem>
												))}
											</Select>
										)}
									/>

									<div className="flex justify-center mt-16">
										<Button
											color="primary"
											type="submit"
											className="font-semibold p-7 w-fit"
										>
											Book an appointment
										</Button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</ContainerWrapper>
			</div>
			<FAQ />
		</>
	);
};

export default Contact;
