/* eslint-disable no-unused-vars */
import { Image, Input, Checkbox, Link, Button, Divider } from "@nextui-org/react";
import logo from "../../../assets/icons/LOGO BIG.svg";
import smileHub from "../../../assets/icons/SMILEHUB BIG.svg";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useAppStore, useAuthTokenPersisted } from "@/store/zustand";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { encrypt } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import AuthSharedAPIManager from "@/services/api/managers/AuthSharedAPIManager";

const SharedLogin = () => {
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);

	const location = useLocation();

	// stores alert dialog details
	const { setAlertDialogDetails } = useAppStore();

	// stores auth token
	const { setAuthToken } = useAuthTokenPersisted();

	// stores error details
	const [isErrorDetails, setIsErrorDetails] = useState({
		isError: false,
		message: "",
	});

	// form submit function
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
		mutationFn: AuthSharedAPIManager.login,
		onSuccess: (data) => {
			// set alert dialog details
			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: data.message,
				actionLink: location.pathname.includes("admin")
					? "/admin/dashboard"
					: "/staff/dashboard",
			});

			// reset error details
			setIsErrorDetails({
				isError: false,
				message: "",
			});

			// encrypt and store user data
			try {
				const enryptedToken = encrypt(data.user);
				setAuthToken(enryptedToken);
			} catch (error) {
				console.log(error);
			}
		},
		onError: (error) => {
			// set error details
			setIsErrorDetails({
				isError: true,
				message: error.message,
			});
		},
	});

	// form submit function
	const onSubmit = (data) => {
		mutation.mutate(data);
	};
	return (
		<div className="flex w-screen h-screen">
			<div className="flex items-center justify-center" style={{ flex: 1 }}>
				<div className="flex flex-col items-center justify-center gap-5 w-fit">
					<Image src={logo} removeWrapper className="w-36" />
					<Image src={smileHub} removeWrapper className="w-80" />
				</div>
			</div>
			<div className="flex items-center justify-center bg-primary" style={{ flex: 1 }}>
				<div className="flex flex-col w-full lg:w-120">
					<h2 className="mb-24 text-5xl text-center text-white">WELCOME</h2>
					{isErrorDetails.isError && (
						<Alert
							variant="destructive"
							className="flex items-center mb-5 bg-red-100 rounded-3xl"
						>
							<AlertCircle className="w-4 h-4" />
							<AlertDescription>{isErrorDetails.message}</AlertDescription>
						</Alert>
					)}
					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
						<div className="flex flex-col ~gap-2/4">
							<label htmlFor="email" className="text-xl text-white">
								Email
							</label>
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
								color="default"
								type="text"
								size="lg"
								radius="full"
								labelPlacement="outside"
								classNames={{
									inputWrapper: "h-full p-4",
									mainWrapper: "h-full",
									input: "ml-3",
								}}
							/>
						</div>
						<div className="flex flex-col ~gap-2/4">
							<label htmlFor="password" className="text-xl text-white">
								Password
							</label>
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
								color="default"
								type={isVisible ? "text" : "password"}
								size="lg"
								radius="full"
								classNames={{
									inputWrapper: "h-full p-4",
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
						</div>
						<Divider className="bg-gray-300" />
						<div className="flex flex-row justify-between">
							<Checkbox
								color="default"
								classNames={{
									label: "text-white font-semibold",
								}}
							>
								Remember Me
							</Checkbox>
							<Link href="#" className="font-semibold text-white underline">
								Forgot Password?
							</Link>
						</div>
						<Button
							type="submit"
							color="default"
							className="w-full h-16 py-8 text-xl font-semibold bg-white text-primary rounded-[10rem] p-7"
						>
							Log in
						</Button>
						<div className="flex flex-row justify-center">
							<Link
								href={
									location.pathname.includes("admin")
										? "/admin/register"
										: "/staff/register"
								}
								className="font-semibold text-center text-white underline"
							>
								Not member yet? Create an account
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SharedLogin;
