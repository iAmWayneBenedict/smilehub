import axios from "axios";

const URL = "https://api.emailjs.com/api/v1.0/email/send";

export const sendEmail = async ({
	type = "notification",
	name,
	email,
	date,
	time,
	password = null,
}) => {
	let template_params = {};
	if (type === "notification") {
		template_params = {
			name,
			date,
			time,
			reply_to: email,
		};
	} else {
		template_params = {
			type,
			name,
			reply_to: email,
			password,
		};
	}

	try {
		const response = await axios.post(URL, {
			service_id: import.meta.env.VITE_EMAIL_SERVICE_ID,
			template_id:
				type === "notification"
					? import.meta.env.VITE_EMAIL_TEMPLATE_NOTIFICATION_ID
					: import.meta.env.VITE_EMAIL_TEMPLATE_CREDENTIAL_ID,
			user_id: import.meta.env.VITE_EMAIL_PUBLIC_KEY,
			template_params,
		});
	} catch (error) {
		console.log(error);
	}
};
