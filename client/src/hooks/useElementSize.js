import { useState, useEffect } from "react";

function useElementSize(elementId) {
	const [size, setSize] = useState({ width: 0, height: 0 });

	useEffect(() => {
		// Function to update the size based on the element's current dimensions
		const updateSize = () => {
			const element = window.getComputedStyle(document.querySelector("body"));

			if (element) {
				setSize({
					width: Number(element.width.replace("px", "")),
					height: Number(element.height.replace("px", "")),
				});
			}
		};

		// Initial size set
		updateSize();

		// Event listener for window resize
		window.addEventListener("resize", updateSize);

		// Clean up event listener on unmount
		return () => window.removeEventListener("resize", updateSize);
	}, [elementId]);

	return size;
}

export default useElementSize;
