import CallIcon from "@/components/icons/CallIcon";
import ContainerWrapper from "@/components/layout/wrappers/ContainerWrapper";
import { Input, Button } from "@nextui-org/react";
import PropTypes from "prop-types";

const ArticleHomePage = ({ title, description, isForm, image }) => {
	return (
		<ContainerWrapper className="flex flex-col items-center gap-5 lg:flex-row mt-36 lg:items-start">
			<div
				id="left-article"
				className="flex-1 max-w-[40rem] flex flex-col gap-8 order-2 lg:order-1 items-center lg:items-start"
			>
				<h2 className="~text-3xl/55xl font-semibold leading-[1.25] capitalize text-center lg:text-left">
					{title}
				</h2>
				<p className="~text-base/lg text-center lg:text-left">{description}</p>
				{isForm ? (
					<div className="flex overflow-hidden rounded-lg h-[4rem] ~w-80/120  justify-center lg:justify-start">
						<Input
							startContent={<CallIcon width="28" height="27" />}
							variant="bordered"
							color="primary"
							type="text"
							size="lg"
							radius="none"
							placeholder="Enter your Phone Number"
							classNames={{
								inputWrapper: "rounded-l-lg border-r-0 h-full pl-5",
								mainWrapper: "h-full",
								input: "ml-3",
							}}
						/>
						<Button
							color="primary"
							className="h-full font-medium"
							size="lg"
							radius="none"
						>
							Submit
						</Button>
					</div>
				) : (
					<Button color="primary" className="font-semibold p-7 w-fit">
						Book an appointment
					</Button>
				)}
			</div>
			<div className="flex items-center justify-center flex-1 order-1 lg:order-2">
				<div
					id="article-home-page-container"
					className="relative w-[80%] -translate-x-4 md:translate-x-0 lg:w-120 h-fit object-cover after:rounded-[13px] after:absolute after:content-[''] after:w-full after:h-full after:-top-[2rem] after:-right-[2rem]"
				>
					{image}
				</div>
			</div>
		</ContainerWrapper>
	);
};
ArticleHomePage.propTypes = {
	title: PropTypes.node,
	description: PropTypes.any,
	isForm: PropTypes.bool,
	image: PropTypes.node,
};

export default ArticleHomePage;
