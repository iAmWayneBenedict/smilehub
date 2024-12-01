import logoIcon from "../../../assets/icons/LOGO.png";
import logoText from "../../../assets/icons/SMILEHUB.png";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem,
	Link,
	Button,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Avatar,
} from "@nextui-org/react";
import { useEffect, useRef, useState, Fragment } from "react";
import "./styles.css";
import { useLocation } from "react-router-dom";
import { useAppStore, useAuthTokenPersisted } from "@/store/zustand";
import { cn, decrypt } from "@/lib/utils";
import PrintProgress from "@/pages/shared/patients/components/PrintProgress.jsx";
import { handlePrint } from "@/pages/shared/patients/components/utils.js";
import { useMutation } from "@tanstack/react-query";
import PatientsAPIManager from "@/services/api/managers/patients/PatientsAPIManager.js";
const NavigationBar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const nav = useRef(null);
	const navMenuBtn = useRef(null);
	const { setAlertDialogDetails } = useAppStore();
	const location = useLocation();
	const { authToken, setAuthToken } = useAuthTokenPersisted();
	const [activeLink, setActiveLink] = useState(location.pathname);
	const [progressNotes, setProgressNotes] = useState(null);

	const getAllProgressNotes = useMutation({
		mutationFn: PatientsAPIManager.getProgressNotes,
		onSuccess: (data) => {
			setProgressNotes(data);
		},
	});

	useEffect(() => {
		// close menu on route change
		setIsMenuOpen(false);
		setActiveLink(location.pathname);
	}, [location.pathname]);

	const user = decrypt(authToken);
	useEffect(() => {
		// change navbar color on specific pages
		if (nav.current === null) return;
		if (
			location.pathname === "/" ||
			location.pathname === "/login" ||
			location.pathname === "/register" ||
			location.pathname === "/profile" ||
			location.pathname === "/terms-and-privacy-policy"
		) {
			nav.current.classList.add("colored");
		} else {
			nav.current.classList.remove("colored");
		}
	}, [location.pathname]);

	useEffect(() => {
		// change navbar color on scroll
		const handleScroll = () => {
			if (
				location.pathname === "/" ||
				location.pathname === "/login" ||
				location.pathname === "/register" ||
				location.pathname === "/profile" ||
				location.pathname === "/terms-and-privacy-policy"
			)
				return;
			if (nav.current === null) return;
			if (window.scrollY > 800) {
				nav.current.classList.add("colored");
			} else {
				nav.current.classList.remove("colored");
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	useEffect(() => {
		
		if(authToken) {
			const user = decrypt(authToken)
			getAllProgressNotes.mutate({ PATIENT_ID: user?.id });
		}
	}, [authToken])
	
	const handleRequestProgressNotes = async () => {
		// getAllProgressNotes.mutate({ PATIENT_ID:  });
		setAlertDialogDetails({
			isOpen: true,
			type: "loading",
			message: "Please wait...",
			showClose: false,
		})
		
		await handlePrint();
		
		setTimeout(() => {
			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: ["Request Successfully", "Please check your downloads folder."],
			})
		}, 2000);
	};

	// navigation menu items
	const navItems = [
		{ name: "Home", href: "/" },
		{ name: "Services", href: "/services" },
		{ name: "Blogs", href: "/blogs" },
		{ name: "About", href: "/about" },
		{ name: "Appointment", href: "/appointment" },
	];

	return (
		<Fragment>
			<Navbar
				id="navbar"
				isBlurred={false}
				className="bg-transparent"
				height={"5rem"}
				onMenuOpenChange={setIsMenuOpen}
				maxWidth="2xl"
				ref={nav}
			>
				{/**
				 ** Navigation menu for logo and menu toggle **
				 */}
				<NavbarContent>
					<NavbarMenuToggle
						aria-label={isMenuOpen ? "Close menu" : "Open menu"}
						className="md:hidden"
						ref={navMenuBtn}
					/>
					<Link href={"/"}>
						<NavbarBrand>
							<div className="flex items-center gap-3 h-[2.5rem] sm:h-[3rem] md:h-fit">
								<img src={logoIcon} alt="logo-icon" className="h-full" />
								<div className="h-[1rem] sm:h-[1.35rem] md:h-fit">
									<img src={logoText} className="h-full" alt="logo-text" />
								</div>
							</div>
						</NavbarBrand>
					</Link>
				</NavbarContent>

				{/**
				 ** Navigation menu for larger screens **
				 */}
				<NavbarContent
					className="hidden md:flex"
					style={{ gap: "clamp(1rem, 2vw, 3rem)" }}
					justify="center"
				>
					{navItems.map((item, index) => (
						<NavbarItem key={index}>
							<div className="relative">
								<Link
									className="font-medium"
									color={activeLink === item.href ? "primary" : "foreground"}
									href={item.href}
									aria-current="page"
								>
									{item.name}
								</Link>
								<div
									className={cn(
										"absolute w-0 h-0 -translate-x-1/2 rounded-full -bottom-2 bg-primary left-1/2 transition-all ease duration-400",
										activeLink === item.href && "w-1.5 h-1.5"
									)}
								/>
							</div>
						</NavbarItem>
					))}
				</NavbarContent>

				{/**
				 ** Navigation menu for avatar and book now button **
				 */}
				<NavbarContent justify="end" id="avatar-container">
					{authToken && (
						<NavbarItem>
							<Dropdown placement="bottom-end">
								<DropdownTrigger>
									<Avatar
										as="button"
										className="transition-transform text-primary bg-accent "
										color="secondary"
										size="md"
										showFallback
									/>
								</DropdownTrigger>

								<DropdownMenu aria-label="Profile Actions" variant="flat" disabledKeys={!progressNotes || progressNotes?.length === 0 ? ["progress-request"] : []}>
									<DropdownItem key="profile" className="gap-2 h-14">
										<p className="font-semibold">Signed in as</p>
										<p className="font-semibold">{user?.fullname}</p>
									</DropdownItem>
									{user?.role === "PATIENT" && (
										<DropdownItem key="admin" href="/profile">
											Profile
										</DropdownItem>
									)}
									{user?.role === "PATIENT" && (
										<DropdownItem key="progress-request" onClick={handleRequestProgressNotes}>
											Request Progress Notes
										</DropdownItem>
									)}
									{user?.role === "ADMIN" && (
										<DropdownItem key="admin" href="/admin/dashboard">
											Admin Panel
										</DropdownItem>
									)}
									{user?.role === "STAFF" && (
										<DropdownItem key="staff" href="/staff/dashboard">
											Staff Panel
										</DropdownItem>
									)}
									<DropdownItem
										key="logout"
										color="danger"
										onClick={() => {
											setAlertDialogDetails({
												type: "danger",
												message: "Are you sure you want to logout?",
												isOpen: true,
												dialogType: "confirm",
												confirmCallback: () => {
													// log out user
													setAuthToken(false);
													setTimeout(() => {
														setAlertDialogDetails({
															isOpen: true,
															type: "success",
															title: "Success!",
															message:
																"You have been successfully logged out.",
															actionLink: "/",
														});
													}, 1000);
												},
											});
										}}
									>
										Log Out
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</NavbarItem>
					)}
					<NavbarItem className="hidden sm:flex">
						<Button
							as={Link}
							color="primary"
							className="px-6 py-6 font-medium text-white bg-primary"
							href={authToken ? "/appointment" : "/login"}
							variant="flat"
						>
							{authToken ? "Book Now" : "Log in"}
						</Button>
					</NavbarItem>
				</NavbarContent>

				{/**
				 ** Navigation menu for mobile **
				 */}
				<NavbarMenu
					style={{
						"--navbar-height": "6rem",
					}}
				>
					{navItems.map((item, index) => (
						<NavbarMenuItem key={`${item.name}-${index}`}>
							<Link
								color={location.pathname === item.href ? "primary" : "foreground"}
								className="w-full"
								href={item.href}
								onClick={() => navMenuBtn.current.click()}
								size="lg"
							>
								{item.name}
							</Link>
						</NavbarMenuItem>
					))}
					{/* {authToken && (
					<NavbarMenuItem>
						<Button
							variant="light"
							color={"danger"}
							className="min-w-0 p-0 data-[hover=true]:bg-transparent w-fit h-fit text-base"
							size="lg"
						>
							Logout
						</Button>
					</NavbarMenuItem>
				)} */}
				</NavbarMenu>
			</Navbar>
			<PrintProgress />
		</Fragment>
	);
};

export default NavigationBar;
{
	/* <NavbarItem className="hidden lg:flex">
					<Link href="#">Login</Link>
				</NavbarItem> */
}
