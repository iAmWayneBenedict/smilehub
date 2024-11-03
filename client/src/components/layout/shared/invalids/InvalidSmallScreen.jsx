import { Image } from "@nextui-org/react";
import logoIcon from "../../../../assets/icons/LOGO.png";
import logoText from "../../../../assets/icons/SMILEHUB.png";
import inValidScreenIllustration from "../../../../assets/illustrations/invalid-screen-illustration.jpg";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const InvalidSmallScreen = () => {
	const location = useLocation();
	const isMinWidth = useMediaQuery({ query: "(min-width: 1024px)" });
	const [isInvalidScreen, setIsInvalidScreen] = useState(false);
	useEffect(() => {
		const isNotLoginPage = !location.pathname.includes("/login");
		const isNotRegisterPage = !location.pathname.includes("/register");
		const isAdminPage = location.pathname.includes("/admin");
		const isStaffPage = location.pathname.includes("/staff");

		// trigger this if the user is in the admin or staff page
		if ((isAdminPage || isStaffPage) && isNotLoginPage && isNotRegisterPage && !isMinWidth) {
			document.body.style.overflow = "hidden";
			setIsInvalidScreen(true);
		} else {
			document.body.style.overflow = "visible";
			setIsInvalidScreen(false);
		}
	}, [location.pathname, isMinWidth]);
	if (!isInvalidScreen) return null;
	return (
		<div className="lg:hidden fixed top-0 left-0 w-full h-full z-[999999] overflow-auto flex justify-center items-center bg-white">
			<div className="flex flex-col items-center justify-center gap-3">
				<br />
				<br />
				<br />
				<div className="flex items-center gap-3 h-[3rem] md:h-fit">
					<Image
						src={logoIcon}
						alt="logo-icon"
						className="h-[3rem] md:h-full"
						radius="none"
					/>
					<div className="h-[1.25rem] md:h-fit">
						<Image
							src={logoText}
							className="h-full"
							alt="logo-text"
							radius="none"
							removeWrapper
						/>
					</div>
				</div>
				<Image
					className="min-w-96 w-[45vw]"
					src={inValidScreenIllustration}
					alt="Invalid Screen Illustration"
				/>
				<div className="flex flex-col items-center gap-2 px-5">
					<h1 className="text-3xl font-bold text-center">
						Minimum requirement screen size reached!
					</h1>
					<p className="text-center">
						Sorry for the inconvenience, please use a larger screen to continue using
						this website.
					</p>
					<h3 className="text-xl font-semibold text-center text-primary">
						- The Management
					</h3>
					<br />
				</div>
			</div>
		</div>
	);
};

export default InvalidSmallScreen;
