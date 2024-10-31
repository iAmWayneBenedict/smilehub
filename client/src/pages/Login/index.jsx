/* eslint-disable no-unused-vars */
import { Image, Input, Checkbox, Link, Button } from "@nextui-org/react";
import img from "../../assets/images/Login IMG.png";
import rImg from "../../assets/images/Register IMG.png";
import { LockKeyhole, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, ArrowLeft, ArrowRight } from "lucide-react";
import { register } from "swiper/element/bundle";
import { useMutation } from "@tanstack/react-query";
import AuthPatientAPIManager from "@/services/api/managers/AuthPatientAPIManager";
import { useAppStore, useAuthTokenPersisted } from "@/store/zustand";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { encrypt } from "@/lib/utils";

// register SwiperElement
register();
const Login = () => {
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);

	// stores alert dialog details
	const { setAlertDialogDetails } = useAppStore();

	// swiper ref
	const swiperElRef = useRef(null);
	const nextSlide = useRef(null);
	const prevSlide = useRef(null);

	// stores auth token
	const { setAuthToken } = useAuthTokenPersisted();

	// stores error
	const [isErrorDetails, setIsErrorDetails] = useState({
		isError: false,
		message: "",
	});

	// form hook
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			EMAIL: "",
			PASSWORD: "",
		},
	});

	// mutation function
	const mutation = useMutation({
		mutationFn: AuthPatientAPIManager.login,
		onSuccess: (data) => {
			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: data.message,
				actionLink: "/",
			});
			setIsErrorDetails({
				isError: false,
				message: "",
			});
			try {
				const date = new Date();
				date.setDate(date.getDate() + 1); // set expiry to the next day
				data.user["expiry"] = date;
				const enryptedToken = encrypt(data.user);
				setAuthToken(enryptedToken);
			} catch (error) {
				console.log(error);
			}
		},
		onError: (error) => {
			setIsErrorDetails({
				isError: true,
				message: error.message,
			});
		},
	});

	// on submit function
	const onSubmit = (data) => {
		mutation.mutate(data);
	};
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
	return (
		<div className="lg:mt-10 justify-center items-center flex flex-row overflow-auto lg:overflow-hidden px-3 lg:px-0 ~gap-2/36 w-full h-[calc(100vh-4rem-4.75rem)]">
			<div
				className="max-w-[50vw] relative hidden lg:block overflow-hidden rounded-tr-2xl"
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
						<div className="relative w-full h-[calc(100vh-4rem-4.75rem)]">
							<Image
								src={img}
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
								src={rImg}
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
					<h2 className="text-4xl font-bold text-darkText">Welcome</h2>
					<p className="text-secondaryText">
					Book your dental appointment online today.
					</p>

					<div className="~mt-10/20">
						{isErrorDetails.isError && (
							<Alert
								variant="destructive"
								className="flex items-center mb-5 bg-red-50"
							>
								<AlertCircle className="w-4 h-4" />
								<AlertDescription>{isErrorDetails.message}</AlertDescription>
							</Alert>
						)}
						<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
							<Input
								{...register("EMAIL", {
									required: "Email is required",
									pattern: {
										value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
										message: "Invalid email address",
									},
								})}
								isInvalid={!!errors.EMAIL?.message}
								errorMessage={errors.EMAIL?.message}
								startContent={
									<Mail width="28" height="27" className="text-[#AFAFAF]" />
								}
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
								{...register("PASSWORD", {
									required: "Password is required",
									pattern: {
										value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
										message:
											"Password must be at least 8 characters long, contain at least one uppercase, lowercase, number and special character",
									},
								})}
								isInvalid={!!errors.PASSWORD}
								errorMessage={errors.PASSWORD?.message}
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
							{/* <div className="flex flex-row justify-end">
								
								<Link href="#" className="font-semibold underline text-darkText">
									Forgot Password?
								</Link>
							</div> */}
							<Button
								type="submit"
								color="primary"
								className="w-full py-8 text-lg font-semibold p-7"
							>
								Log in
							</Button>
							<div className="flex flex-row justify-center">
								<Link
									href="/register"
									className="font-semibold text-center underline text-darkText"
								>
									Not member yet? Create an account
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
