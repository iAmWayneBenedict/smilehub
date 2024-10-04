import { Image, Button } from "@nextui-org/react";
import PropTypes from "prop-types";

const SpecialistRow = ({ img, name, specialty, description }) => {
	return (
		<div className="flex ~gap-4/12 mx-2 md:~mx-12/24 flex-col lg:flex-row">
			<div style={{ flex: 3 }}>
				<Image src={img} className="w-full" removeWrapper alt="About Us" />
			</div>
			<div className="flex flex-col justify-center gap-6 my-0 lg:my-10" style={{ flex: 7 }}>
				<div className="flex flex-col items-start gap-2 md:items-center md:gap-12 md:flex-row">
					<h2 className="~text-xl/3xl font-bold">{name}</h2>
					<span className="text-base">{specialty}</span>
				</div>
				<p className="text-lg leading-8">{description}</p>
				{/* <Button color="primary" className="~mt-4/10 font-semibold p-7 w-fit">
					Book an Appointment
				</Button> */}
			</div>
		</div>
	);
};
SpecialistRow.propTypes = {
	img: PropTypes.string,
	name: PropTypes.string,
	specialty: PropTypes.string,
	description: PropTypes.string,
};

export default SpecialistRow;
