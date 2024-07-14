import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

const ArticleCard = () => {
	return (
		<Card className="py-4 shadow-none w-fit bg-accent">
			<CardHeader className="flex-col items-start px-4 pt-2 pb-0">
				<div className="max-w-[19rem]">
					<Image
						removeWrapper
						alt="Card background"
						className="object-cover rounded-xl"
						src="https://nextui.org/images/hero-card-complete.jpeg"
					/>
				</div>
			</CardHeader>
			<CardBody className="flex flex-col gap-3 py-2 mt-3 overflow-visible">
				<div className="p-2 px-6 text-white rounded-md bg-primary w-fit">Self Care</div>
				<h4 className="font-bold text-large">Care of your teeth</h4>
				<p>Lorem ipsum dolor sit amet consectetur.</p>
				<small className="font-bold text-right">~ Anita Jackson</small>
			</CardBody>
		</Card>
	);
};

export default ArticleCard;
