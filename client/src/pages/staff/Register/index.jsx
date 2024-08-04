<<<<<<< HEAD
=======
/* eslint-disable no-unused-vars */
>>>>>>> dddf27f5f1306d623371e4827ba82ffefac92537
import { Image, Input, Checkbox, Link, Button } from "@nextui-org/react";
import img from "../../../assets/images/Login IMG.png";
import rImg from "../../../assets/images/Register IMG.png";
import { LockKeyhole, Mail, UserRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, ArrowLeft, ArrowRight } from "lucide-react";
import { register } from "swiper/element/bundle";
<<<<<<< HEAD
=======
import { useMutation } from "@tanstack/react-query";
import { useAppStore } from "@/store/zustand";
import AuthStaffAPIManager from "@/services/api/managers/AuthStaffAPIManager";
>>>>>>> dddf27f5f1306d623371e4827ba82ffefac92537
// register SwiperElement
register();
const StaffRegister = () => {
	const [isVisible, setIsVisible] = useState(false);
<<<<<<< HEAD
	const swiperElRef = useRef(null);
	const nextSlide = useRef(null);
	const prevSlide = useRef(null);
	const toggleVisibility = () => setIsVisible(!isVisible);

=======
	const toggleVisibility = () => setIsVisible(!isVisible);

	// swiper refs
	const swiperElRef = useRef(null);
	const nextSlide = useRef(null);
	const prevSlide = useRef(null);

	// stores alert dialog details
	const { setAlertDialogDetails } = useAppStore();

	// mutation for registration
	const mutation = useMutation({
		mutationFn: AuthStaffAPIManager.register,
		onSuccess: (data) => {
			// show alert dialog
			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: [data.message, "Please login to continue."].join(" "),
				actionLink: "/staff/login",
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

	// form hook
>>>>>>> dddf27f5f1306d623371e4827ba82ffefac92537
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
<<<<<<< HEAD
			name: "",
			email: "",
			password: "",
=======
			FULLNAME: "",
			EMAIL: "",
			PASSWORD: "",
>>>>>>> dddf27f5f1306d623371e4827ba82ffefac92537
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
<<<<<<< HEAD
			console.log("slide changed");
=======
			// console.log("slide changed");
>>>>>>> dddf27f5f1306d623371e4827ba82ffefac92537
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
<<<<<<< HEAD
	const onSubmit = (data) => console.log(data);
=======

	// form submission
	const onSubmit = (data) => {
		mutation.mutate(data);
	};
>>>>>>> dddf27f5f1306d623371e4827ba82ffefac92537
	return (
		<div className="mt-20 md:mt-10 justify-center items-center flex flex-row lg:overflow-hidden px-3 lg:px-0 ~gap-2/36 w-full h-[calc(100vh-2.5rem)]">
			<div
				className="max-w-[50vw] relative hidden lg:block overflow-hidden rounded-tr-2xl h-full"
				style={{ flex: 1 }}
			>
				<swiper-container
					free-mode="true"
					ref={swiperElRef}
					slides-per-view={"1"}
					loop="true"
					autoplay-delay="2500"
					autoplay-disable-on-interaction="false"
				>
					<swiper-slide>
						<div className="relative w-full h-[calc(100vh-2.5rem)]">
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
						<div className="relative w-full h-[calc(100vh-2.5rem)]">
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
			<div style={{ flex: 1 }} className="flex items-center justify-center lg:justify-start">
				<div className="max-w-[35rem] w-full">
					<h2 className="text-4xl font-bold text-darkText">Create an account</h2>
					<p className="text-secondaryText">
						Discover a better way of spandings with Uifry.
					</p>

					<div className="~mt-10/20 mb-10 lg:mb-0">
						<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
							<Input
<<<<<<< HEAD
								{...register("name", {
									required: "Name is required",
								})}
								isInvalid={!!errors.name}
								errorMessage={errors.name?.message}
=======
								{...register("FULLNAME", {
									required: "Name is required",
								})}
								isInvalid={!!errors.FULLNAME}
								errorMessage={errors.FULLNAME?.message}
>>>>>>> dddf27f5f1306d623371e4827ba82ffefac92537
								startContent={
									<UserRound width="28" height="27" className="text-[#AFAFAF]" />
								}
								variant="bordered"
								color="primary"
								type="text"
								size="lg"
								radius="none"
								placeholder="Enter your Name"
								classNames={{
									inputWrapper: "h-full rounded-lg p-4",
									mainWrapper: "h-full",
									input: "ml-3",
								}}
							/>
							<Input
<<<<<<< HEAD
								{...register("email", {
=======
								{...register("EMAIL", {
>>>>>>> dddf27f5f1306d623371e4827ba82ffefac92537
									required: "Email is required",
									pattern: {
										value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
										message: "Invalid email address",
									},
								})}
								startContent={
									<Mail width="28" height="27" className="text-[#AFAFAF]" />
								}
<<<<<<< HEAD
								isInvalid={!!errors.email}
								errorMessage={errors.email?.message}
=======
								isInvalid={!!errors.EMAIL}
								errorMessage={errors.EMAIL?.message}
>>>>>>> dddf27f5f1306d623371e4827ba82ffefac92537
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
<<<<<<< HEAD
								{...register("password", {
=======
								{...register("PASSWORD", {
>>>>>>> dddf27f5f1306d623371e4827ba82ffefac92537
									required: "Password is required",
									pattern: {
										value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
										message:
											"Password must be at least 8 characters long, contain at least one uppercase, lowercase, number and special character",
									},
								})}
<<<<<<< HEAD
								isInvalid={!!errors.password}
								errorMessage={errors.password?.message}
=======
								isInvalid={!!errors.PASSWORD}
								errorMessage={errors.PASSWORD?.message}
>>>>>>> dddf27f5f1306d623371e4827ba82ffefac92537
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
								className="w-full py-8 text-lg font-semibold p-7"
							>
<<<<<<< HEAD
								Log in
=======
								Register
>>>>>>> dddf27f5f1306d623371e4827ba82ffefac92537
							</Button>
							<div className="flex flex-row justify-center">
								<Link
									href="/staff/login"
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

export default StaffRegister;
