/* eslint-disable no-unused-vars */
import { Image, Input, Checkbox, Link, Button, Select, SelectItem } from "@nextui-org/react";
import img from "../../assets/images/Login IMG.png";
import rImg from "../../assets/images/Register IMG.png";
import { LockKeyhole, Mail, UserRound } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, ArrowLeft, ArrowRight, Calendar, ContactRound } from "lucide-react";
import { register } from "swiper/element/bundle";
import { useMutation } from "@tanstack/react-query";
import AuthPatientAPIManager from "@/services/api/managers/AuthPatientAPIManager";
import { useAppStore } from "@/store/zustand";
import CustomDatePicker from "@/components/ui/DatePicker";
import { today } from "@internationalized/date";
import { getLocalTimeZone } from "@internationalized/date";
// register SwiperElement
register();
const Register = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [agreedTerms, setAgreedTerms] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);

	// swiper refs
	const swiperElRef = useRef(null);
	const nextSlide = useRef(null);
	const prevSlide = useRef(null);

	// stores alert dialog details
	const { setAlertDialogDetails } = useAppStore();

	// mutation function
	const mutation = useMutation({
		mutationFn: AuthPatientAPIManager.register,
		onSuccess: (data) => {
			// show alert dialog
			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: [data.message, "Please login to continue."].join(" "),
				actionLink: "/login",
			});
		},
		onError: (error) => {
			// show alert dialog
			setAlertDialogDetails({
				isOpen: true,
				type: "danger",
				title: "Error!",
				message: error.message,
			});
		},
	});

	// form submit function
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			FIRSTNAME: "",
			LASTNAME: "",
			BIRTHDATE: today(getLocalTimeZone()),
			PHONE: "",
			EMAIL: "",
			PASSWORD: "",
		},
	});
	useEffect(() => {
		// listen for Swiper events using addEventListener
		swiperElRef.current?.addEventListener("swiperprogress", (e) => {
			const [swiper, progress] = e.detail;

			// * view progress in this event
		});

		swiperElRef.current?.addEventListener("swiperslidechange", (e) => {
			// * when slide changes do something here
			// console.log("slide changed");
		});

		// initialize next button listener
		nextSlide.current?.addEventListener("click", () => {
			// initiate next slide from swiper instance
			swiperElRef.current?.swiper.slideNext();
		});

		// initialize prev button listener
		prevSlide.current?.addEventListener("click", () => {
			// initiate prev slide from swiper instance
			swiperElRef.current?.swiper.slidePrev();
		});
	}, []);

	// form submit function
	const onSubmit = (data) => {
		// convert date to Date object before sending request
		data.BIRTHDATE = new Date(
			data.BIRTHDATE.year,
			data.BIRTHDATE.month - 1,
			data.BIRTHDATE.day
		);
		mutation.mutate(data);
	};
	return (
		<div className="mt-20 md:mt-10 justify-center items-center flex flex-row lg:overflow-hidden px-3 lg:px-0 ~gap-2/36 w-full h-[calc(100vh-4rem-4.75rem)]">
			<div
				className="max-w-[50vw] relative hidden lg:block overflow-hidden rounded-tr-2xl"
				style={{ flex: 1 }}
			>
				<swiper-container
					free-mode="true"
					ref={swiperElRef}
					slides-per-view={"1"}
					loop="true"
					autoplay-delay="2500" // 2.5 seconds
					autoplay-disable-on-interaction="false"
				>
					<swiper-slide>
						<div className="relative w-full h-[calc(100vh-4rem-4.75rem)]">
							<Image
								src={rImg}
								className="z-0 object-cover w-full h-full rounded-none rounded-tr-2xl"
								removeWrapper
							/>
							<div
								id="img-overlay"
								className="bg-black/20 absolute top-0 left-0 w-full h-full z-[1]"
							></div>
							<div className="absolute left-0 z-10 px-10 pb-10 bottom-[10%]">
								<div>
									<p className="text-2xl text-white capitalize">
										“For there was never yet philosopher, That could endure the
										toothache patiently”
									</p>
									<p className="text-2xl text-white capitalize">
										~ Dr Dre Andre Romelle
									</p>
								</div>
							</div>
						</div>
					</swiper-slide>
					<swiper-slide>
						<div className="relative w-full h-[calc(100vh-4rem-4.75rem)]">
							<Image
								src={img}
								className="z-0 object-cover w-full h-full rounded-none"
								removeWrapper
							/>
							<div
								id="img-overlay"
								className="bg-black/20 absolute top-0 left-0 w-full h-full z-[1]"
							></div>
							<div className="absolute left-0 z-10 px-10 pb-10 bottom-[10%]">
								<div>
									<p className="text-2xl text-white capitalize">
										“For there was never yet philosopher, That could endure the
										toothache patiently”
									</p>
									<p className="text-2xl text-white capitalize">
										~ Dr Dre Andre Romelle
									</p>
								</div>
							</div>
						</div>
					</swiper-slide>
				</swiper-container>
				<div className="absolute bottom-0 left-0 z-10 px-10 pb-10">
					<div className="flex flex-row gap-3 mt-10 text-white">
						<Button
							value={"ghost"}
							color=""
							ref={prevSlide}
							className="min-w-0 p-2 bg-transparent border border-white rounded-full"
						>
							<ArrowLeft />
						</Button>
						<Button
							value={"ghost"}
							color=""
							ref={nextSlide}
							className="min-w-0 p-2 bg-transparent border border-white rounded-full"
						>
							<ArrowRight />
						</Button>
					</div>
				</div>
			</div>
			<div
				style={{ flex: 1 }}
				className="flex items-center justify-center overflow-y-auto h-[calc(100vh-4rem-4.75rem)] lg:justify-start"
			>
				<div className="max-w-[35rem] w-full py-10">
					<br />
					<h2 className="text-4xl font-bold text-darkText">Create an account</h2>
					<p className="text-secondaryText">
						Discover a better way of spandings with Uifry.
					</p>

					<div className="~mt-10/20 mb-10 lg:mb-0">
						<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
							<div className="flex flex-row gap-2">
								<Input
									{...register("FIRSTNAME", {
										required: "First name is required", // custom error message
									})}
									isInvalid={!!errors.FIRSTNAME} // check if the input is invalid
									errorMessage={errors.FIRSTNAME?.message} // get the error message
									startContent={
										<UserRound
											width="28"
											height="27"
											className="text-[#AFAFAF]"
										/>
									}
									variant="bordered"
									color="primary"
									type="text"
									size="lg"
									radius="none"
									placeholder="Enter your first name"
									classNames={{
										inputWrapper: "h-full rounded-lg p-4",
										mainWrapper: "h-full",
										input: "ml-3",
									}}
								/>
								<Input
									{...register("LASTNAME", {
										required: "Last name is required", // custom error message
									})}
									isInvalid={!!errors.LASTNAME} // check if the input is invalid
									errorMessage={errors.LASTNAME?.message} // get the error message
									startContent={
										<UserRound
											width="28"
											height="27"
											className="text-[#AFAFAF]"
										/>
									}
									variant="bordered"
									color="primary"
									type="text"
									size="lg"
									radius="none"
									placeholder="Enter your last name"
									classNames={{
										inputWrapper: "h-full rounded-lg p-4",
										mainWrapper: "h-full",
										input: "ml-3",
									}}
								/>
							</div>
							<div className="flex flex-row gap-2">
								<Controller
									name="BIRTHDATE"
									control={control}
									rules={{ required: "Birth date is required" }}
									render={({ field, formState: { errors } }) => (
										<CustomDatePicker
											value={field.value}
											showTimeSelect={false}
											label={""}
											isInvalid={!!errors.BIRTHDATE}
											errorMessage={errors.BIRTHDATE?.message}
											setValue={(value) => {
												field.onChange(value);
											}}
											classNames={{
												inputWrapper: "h-full rounded-lg p-4",
												innerWrapper: "h-full text-lightText",
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
											startContent={<ContactRound />}
											size="lg"
											variant="bordered"
											color="primary"
											radius="none"
											className="w-full bg-white"
											classNames={{
												label: "text-lightText font-semibold ",
												inputWrapper: "h-full",
												trigger: "h-full py-5 rounded-lg ",
												innerWrapper: "h-full text-lightText",
											}}
										>
											{["Male", "Female", "Rather not to say"].map((time) => (
												<SelectItem key={time} value={time}>
													{time}
												</SelectItem>
											))}
										</Select>
									)}
								/>
							</div>
							<Input
								{...register("EMAIL", {
									required: "Email is required", // custom error message
									pattern: {
										value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // regex pattern for email
										message: "Invalid email address", // custom error message
									},
								})}
								startContent={
									<Mail width="28" height="27" className="text-[#AFAFAF]" />
								}
								isInvalid={!!errors.EMAIL} // check if the input is invalid
								errorMessage={errors.EMAIL?.message} // get the error message
								variant="bordered"
								color="primary"
								type="text"
								size="lg"
								radius="none"
								placeholder="Enter your Email"
								classNames={{
									inputWrapper: "h-full rounded-lg p-4",
									mainWrapper: "h-full",
									input: "ml-3",
								}}
							/>
							<Input
								{...register("PHONE", {
									required: "Phone Number is required",
									pattern: {
										value: /^9\d{9}$/,
										message: "Invalid phone number",
									},
								})}
								startContent={"+63"}
								isInvalid={!!errors.PHONE} // check if the input is invalid
								errorMessage={errors.PHONE?.message} // get the error message
								variant="bordered"
								color="primary"
								type="text"
								size="lg"
								placeholder="Enter your phone"
								classNames={{
									inputWrapper: "h-full rounded-lg p-4",
									mainWrapper: "h-full",
									input: "ml-3",
								}}
							/>
							<Input
								{...register("PASSWORD", {
									required: "Password is required", // custom error message
									pattern: {
										value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // regex pattern for password
										message:
											"Password must be at least 8 characters long, contain at least one uppercase, lowercase, number and special character",
									},
								})}
								isInvalid={!!errors.PASSWORD} // check if the input is invalid
								errorMessage={errors.PASSWORD?.message} // get the error message
								startContent={
									<LockKeyhole
										width="28"
										height="27"
										className="text-[#AFAFAF]"
									/>
								}
								variant="bordered"
								color="primary"
								type={isVisible ? "text" : "password"}
								size="lg"
								radius="none"
								placeholder="Enter your Password"
								classNames={{
									inputWrapper: "h-full rounded-lg p-4",
									mainWrapper: "h-full",
									input: "ml-3",
								}}
								endContent={
									<button
										className="focus:outline-none"
										type="button"
										onClick={toggleVisibility}
										aria-label="toggle password visibility"
									>
										{isVisible ? (
											<Eye className="text-2xl pointer-events-none text-default-400" />
										) : (
											<EyeOff className="text-2xl pointer-events-none text-default-400" />
										)}
									</button>
								}
							/>
							<div className="flex flex-row justify-between">
								<Checkbox
									onChange={(e) => setAgreedTerms(e.target.checked)}
									classNames={{
										label: "text-darkText font-semibold",
									}}
								>
									I agree with Terms and Privacy
								</Checkbox>
							</div>
							<Button
								type="submit"
								color="primary"
								isDisabled={!agreedTerms}
								className="w-full py-8 text-lg font-semibold p-7"
							>
								Register
							</Button>
							<div className="flex flex-row justify-center">
								<Link
									href="/login"
									className="font-semibold text-center underline text-darkText"
								>
									Have account? Sign In
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
