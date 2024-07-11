import CallIcon from "@/components/icons/CallIcon";
import ContainerWrapper from "@/components/layout/wrappers/ContainerWrapper";
import { Input, Button } from "@nextui-org/react";
import PropTypes from "prop-types";

const ArticleHomePage = ({ title, description, isForm, image }) => {
	return (
		<ContainerWrapper className="flex gap-5 mt-36">
			<div id="left-article" className="flex-1 max-w-[40rem] flex flex-col gap-8">
				<h2 className="text-[3.25rem] font-semibold leading-[1.25] capitalize">{title}</h2>
				<p className="text-lg ">{description}</p>
				{isForm ? (
					<div className="flex overflow-hidden rounded-lg h-[4rem] w-[30rem]">
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
			<div className="flex items-center justify-center flex-1">
				<div
					id="article-home-page-container"
					className="relative w-[30rem] h-fit object-cover after:rounded-[13px] after:absolute after:content-[''] after:w-full after:h-full after:-top-[2rem] after:-right-[2rem]"
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
