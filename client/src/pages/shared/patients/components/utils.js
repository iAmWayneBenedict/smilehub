import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const handlePrint = async () => {
	var pdf = new jsPDF("p", "pt", [612, 800]);
	const canvas = await html2canvas(document.querySelector("#print-progress"), {
		useCORS: true,
		allowTaint: true,
		scrollY: 0,
	});

	const image = { type: "png", quality: 1 };
	const margin = [0, 0];

	var imgWidth = 612;
	var pageHeight = 855;
	var innerPageWidth = imgWidth - margin[0] * 2;
	var innerPageHeight = pageHeight - margin[1] * 2;
	// Calculate the number of pages.
	var pxFullHeight = canvas.height;
	var pxPageHeight = Math.floor(canvas.width * (pageHeight / imgWidth));
	var nPages = Math.ceil(pxFullHeight / pxPageHeight);
	// Define pageHeight separately so it can be trimmed on the final page.
	pageHeight = innerPageHeight;
	// Create a one-page canvas to split up the full image.
	var pageCanvas = document.createElement("canvas");
	var pageCtx = pageCanvas.getContext("2d");
	pageCanvas.width = canvas.width;
	pageCanvas.height = pxPageHeight;
	for (var page = 0; page < nPages; page++) {
		// Trim the final page to reduce file size.
		if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
			pageCanvas.height = pxFullHeight % pxPageHeight;
			pageHeight = (pageCanvas.height * innerPageWidth) / pageCanvas.width;
		}
		// Display the page.
		var w = pageCanvas.width;
		var h = pageCanvas.height;
		pageCtx.fillStyle = "white";
		pageCtx.fillRect(0, 0, w, h);
		pageCtx.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h);
		// Add the page to the PDF.
		if (page > 0) pdf.addPage();

		var imgData = pageCanvas.toDataURL("image/" + image.type, image.quality);
		pdf.addImage(imgData, image.type, margin[1], 25, innerPageWidth, pageHeight);
	}
	pdf.save("Progress Notes.pdf");
};
