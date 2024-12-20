import React from "react";
import PropTypes from "prop-types";

const MedicalIcon = ({ color, ...props }) => {
	return (
		<svg {...props} viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g clipPath="url(#clip0_1_6039)">
				<path
					d="M30.8335 9.25004H24.6668V6.16671C24.6668 4.47087 23.2793 3.08337 21.5835 3.08337H15.4168C13.721 3.08337 12.3335 4.47087 12.3335 6.16671V9.25004H6.16683C4.471 9.25004 3.0835 10.6375 3.0835 12.3334V30.8334C3.0835 32.5292 4.471 33.9167 6.16683 33.9167H30.8335C32.5293 33.9167 33.9168 32.5292 33.9168 30.8334V12.3334C33.9168 10.6375 32.5293 9.25004 30.8335 9.25004ZM15.4168 6.16671H21.5835V9.25004H15.4168V6.16671ZM30.8335 30.8334H6.16683V12.3334H30.8335V30.8334Z"
					fill={color}
				/>
				<path
					d="M20.0418 15.4167H16.9585V20.0417H12.3335V23.1251H16.9585V27.7501H20.0418V23.1251H24.6668V20.0417H20.0418V15.4167Z"
					fill={color}
				/>
			</g>
			<defs>
				<clipPath id="clip0_1_6039">
					<rect width="37" height="37" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
MedicalIcon.propTypes = {
	color: PropTypes.string,
};
export default MedicalIcon;
