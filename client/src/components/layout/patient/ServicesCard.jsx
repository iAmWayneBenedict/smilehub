import { Card, Button, CardHeader, CardBody, CardFooter, Link } from "@nextui-org/react";
import { ArrowRightCircle } from "lucide-react";
import PropTypes from "prop-types";

export default function ServicesCard({ icon, href, title, description }) {
	return (
		<Card className="w-full max-w-full sm:max-w-[300px] md:max-w-[400px]">
			<CardHeader className="flex justify-center">
				<div className="p-3 rounded-full bg-primary">{icon}</div>
			</CardHeader>
			<CardBody className="flex flex-col justify-center gap-3">
				<h2 className="text-xl font-semibold text-center">{title}</h2>
				<p className="text-center">{description}</p>
			</CardBody>
		</Card>
	);
}
ServicesCard.propTypes = {
	icon: PropTypes.element,
	href: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
};
