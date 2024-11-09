/* eslint-disable no-unused-vars */
import { register } from "swiper/element/bundle";
import { useRef, useEffect } from "react";
import SpecialistCard from "./SpecialistCard";
import { Button } from "@nextui-org/react";
import { MoveLeft, MoveRight } from "lucide-react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";
import FeedbackCard from "./FeedbackCard";
import ArticleCard from "./ArticleCard";
import { useMediaQuery } from "react-responsive";

// register SwiperElement
register();

const SwiperElement = ({ data, buttonTheme, type, kind, slidesPerView = "4.5" }) => {
	const swiperElRef = useRef(null);
	const nextSlide = useRef(null);
	const prevSlide = useRef(null);
	const isMobile = useMediaQuery({
		query: "(max-width: 640px)",
	});
	const buttonClassesTheme =
		buttonTheme === "light" ? "text-black bg-white" : "text-white bg-black";

	useEffect(() => {
		// listen for Swiper events using addEventListener
		swiperElRef.current?.addEventListener("swiperprogress", (e) => {
			const [swiper, progress] = e.detail;

			// * view progress in this event
		});

		swiperElRef.current?.addEventListener("swiperslidechange", (e) => {
			// * when slide changes do something here
			// console.log("slide changed");
		});

		// initialize next button listener
		nextSlide.current?.addEventListener("click", () => {
			// initiate next slide from swiper instance
			swiperElRef.current?.swiper.slideNext();
		});

		// initialize prev button listener
		prevSlide.current?.addEventListener("click", () => {
			// initiate prev slide from swiper instance
			swiperElRef.current?.swiper.slidePrev();
		});
	}, []);

	return (
		<div className="w-full mt-16">
			<div className="w-full">
				{/* swiper wrapper */}
				<swiper-container
					space-between={isMobile ? "0" : "5"}
					free-mode="true"
					ref={swiperElRef}
					slides-per-view={slidesPerView}
					loop="true"
				>
					{data?.map((item, index) => {
						return (
							// swiper-slide wrapper from swiper library
							<swiper-slide
								key={index}
								style={{ paddingLeft: isMobile ? "1rem" : "2rem" }}
							>
								{/* custom styled cards */}
								{type === "specialists" && <SpecialistCard data={item} />}
								{type === "feedbacks" && <FeedbackCard data={item} />}
								{type === "blogs" && (
									<ArticleCard
										classNames={{
											parentClassName: "w-full h-full",
											imgParentClassName: "max-w-full",
										}}
										data={item}
										kind={kind || ""}
									/>
								)}
							</swiper-slide>
						);
					})}
				</swiper-container>
			</div>

			{/*
			 * Navigation buttons for swiper
			 */}
			<div className="flex justify-center gap-5 mt-16">
				{/* Previous Button */}
				<Button
					ref={prevSlide}
					color="primary"
					size="lg"
					className={cn(
						"px-0 py-1 font-semibold text-black bg-white rounded-none w-fit",
						buttonClassesTheme
					)}
				>
					<MoveLeft size={50} strokeWidth={1} style={{ maxWidth: "none" }} />
				</Button>

				{/* Next Button */}
				<Button
					ref={nextSlide}
					color="primary"
					size="lg"
					className={cn(
						"px-0 py-1 font-semibold text-black bg-white rounded-none w-fit",
						buttonClassesTheme
					)}
				>
					<MoveRight size={50} strokeWidth={1} style={{ maxWidth: "none" }} />
				</Button>
			</div>
		</div>
	);
};
SwiperElement.propTypes = {
	data: PropTypes.any,
	buttonTheme: PropTypes.string,
	type: PropTypes.string,
	slidesPerView: PropTypes.any,
};

export default SwiperElement;
