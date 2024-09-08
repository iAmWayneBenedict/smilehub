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
import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { useLocation } from "react-router-dom";
import { useAppStore, useAuthTokenPersisted } from "@/store/zustand";
import { decrypt } from "@/lib/utils";
const NavigationBar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const nav = useRef(null);
	const { setAlertDialogDetails } = useAppStore();
	const location = useLocation();
	const { authToken, setAuthToken } = useAuthTokenPersisted();

	const user = decrypt(authToken);

	useEffect(() => {
		// change navbar color on specific pages
		if (nav.current === null) return;
		if (
			location.pathname === "/" ||
			location.pathname === "/login" ||
			location.pathname === "/register" ||
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

	// navigation menu items
	const menuItems = ["Home", "Services", "Blogs", "About", "Contact", "Log Out"];
	const navItems = [
		{ name: "Home", href: "/" },
		{ name: "Services", href: "/services" },
		{ name: "Blogs", href: "/blogs" },
		{ name: "About", href: "/about" },
		{ name: "Contact", href: "/contact" },
	];

	return (
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
				/>
				<Link href={"/"}>
					<NavbarBrand>
							<div className="flex items-center gap-3 h-[3rem] md:h-fit">
								<img src={logoIcon} alt="logo-icon" className="h-full" />
								<div className="h-[1.35rem] md:h-fit">
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
						<Link
							className="font-medium"
							color="foreground"
							href={item.href}
							aria-current="page"
						>
							{item.name}
						</Link>
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
									className="transition-transform"
									color="secondary"
									size="md"
									showFallback
								/>
							</DropdownTrigger>

							<DropdownMenu aria-label="Profile Actions" variant="flat">
								<DropdownItem key="profile" className="gap-2 h-14">
									<p className="font-semibold">Signed in as</p>
									<p className="font-semibold">{user?.fullname}</p>
								</DropdownItem>
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
						href={authToken ? "/contact" : "/login"}
						variant="flat"
					>
						Book Now
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
							size="lg"
						>
							{item.name}
						</Link>
					</NavbarMenuItem>
				))}
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
			</NavbarMenu>
		</Navbar>
	);
};

export default NavigationBar;
{
	/* <NavbarItem className="hidden lg:flex">
					<Link href="#">Login</Link>
				</NavbarItem> */
}
