/* eslint-disable no-unused-vars */
import { useAppStore } from "@/store/zustand";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Slider,
	Link,
} from "@nextui-org/react";
import { ReactPainter } from "react-painter";
import teethDiagramImg from "../../../assets/images/teeth-diagram.png";
import { useState } from "react";
import { useRef } from "react";
import { CircleX, Undo2, Redo2 } from "lucide-react";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import PatientsAPIManager from "@/services/api/managers/patients/PatientsAPIManager";

const TeethDiagram = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [brushSize, setBrushSize] = useState(25);
	const [color, setColor] = useState("#000000");
	const [alpha, setAlpha] = useState(10);
	const [initialImage, setInitialImage] = useState(teethDiagramImg);
	const [showDownload, setShowDownload] = useState(false);
	const { teethDiagramModalDetails, setTeethDiagramModalDetails, setAlertDialogDetails } =
		useAppStore();

	const addDiagramMutation = useMutation({
		mutationFn: PatientsAPIManager.postAddDiagram,
		onSuccess: () => {
			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: "The diagram has been added successfully.",
			});
			setTeethDiagramModalDetails({});
		},
		onError: (error) => {
			console.log(error);
			setAlertDialogDetails({
				isOpen: true,
				type: "danger",
				title: "Error!",
				message: error.message,
			});
		},
	});

	const getMutation = useMutation({
		mutationFn: PatientsAPIManager.getDiagram,
		onSuccess: (data) => {
			console.log(data);
			// setInitialImage(data?.data?.image);
		},
	});

	useEffect(() => {
		if (!teethDiagramModalDetails.isOpen) return;
		getMutation.mutate({
			PATIENT_ID: teethDiagramModalDetails?.data?.id,
		});
	}, [teethDiagramModalDetails]);

	const [history, setHistory] = useState([]);
	const [redoStack, setRedoStack] = useState([]);
	const canvasRef = useRef(null);

	useEffect(() => {
		if (teethDiagramModalDetails.isOpen) {
			onOpen();
		} else {
			onClose();
		}
	}, [teethDiagramModalDetails]);

	const handleSave = () => {
		const canvas = canvasRef.current;
		const dataUrl = canvas.toDataURL();

		// Save the image to the history
		setHistory([...history, dataUrl]);

		// Clear the redo stack
		setRedoStack([]);
	};

	const handleUndo = () => {
		if (history.length > 0) {
			const newHistory = [...history];
			const lastState = newHistory.pop();

			// Add the last state to the redo stack
			setRedoStack([lastState, ...redoStack]);

			// Set the history to the new history
			setHistory(newHistory);

			const img = new Image();

			// If the last state is undefined, set the image to the initial image
			if (newHistory[newHistory.length - 1] === undefined) img.src = teethDiagramImg;
			// Else set the image to the last state
			else img.src = newHistory[newHistory.length - 1];

			// Draw the image on the canvas
			img.onload = () => {
				const ctx = canvasRef.current.getContext("2d");
				ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
				ctx.drawImage(img, 0, 0);
			};
		}
	};

	const handleRedo = () => {
		if (redoStack.length > 0) {
			const newRedoStack = [...redoStack];
			const nextState = newRedoStack.shift();

			// Add the next state to the history
			setHistory([...history, nextState]);

			// Set the redo stack to the new redo stack
			setRedoStack(newRedoStack);

			const img = new Image();

			// set the image to the next state
			img.src = nextState;

			// Draw the image on the canvas
			img.onload = () => {
				const ctx = canvasRef.current.getContext("2d");
				ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
				ctx.drawImage(img, 0, 0);
			};
		}
	};
	const clearCanvas = () => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		//redraw the image
		setInitialImage(teethDiagramImg);
		const image = new Image();
		image.src = teethDiagramImg;
		image.onload = () => {
			ctx.drawImage(image, 0, 0);
		};
	};
	const handleSaveDB = (blob) => {
		const file = new File([blob], "teeth-diagram.png", { type: "image/png" });
		console.log(teethDiagramModalDetails?.data?.id, file);
		const formData = new FormData();
		formData.append("file1", file);
		formData.append("PATIENT_ID", teethDiagramModalDetails?.data?.id);
	};
	return (
		<Modal
			size={"5xl"}
			isOpen={isOpen}
			backdrop="blur"
			onClose={() => {
				onClose();
				setTeethDiagramModalDetails({ isOpen: false });
			}}
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							{teethDiagramModalDetails?.title}
						</ModalHeader>
						<ModalBody>
							<ReactPainter
								image={initialImage}
								initialLineWidth={brushSize}
								initialColor={color + alphaValues[alpha]}
								onSave={(blob) => handleSaveDB(blob)}
								render={({
									triggerSave,
									getCanvasProps,
									setLineWidth,
									setColor: setBrushColor,
									imageDownloadUrl,
								}) => (
									<div className="flex flex-row gap-5">
										<div
											style={{ flex: 1 }}
											className="flex items-center justify-center"
										>
											<canvas
												onClick={() => {
													handleSave();
													setShowDownload(false);
												}}
												{...getCanvasProps({
													ref: (ref) => (canvasRef.current = ref),
												})}
											/>
										</div>
										<div
											style={{ flex: 1 }}
											className="flex flex-col justify-center gap-6"
										>
											<div className="flex gap-2">
												<Button
													style={{ flex: 1 }}
													onClick={handleUndo}
													startContent={<Undo2 />}
												>
													Undo
												</Button>
												<Button
													style={{ flex: 1 }}
													onClick={handleRedo}
													startContent={<Redo2 />}
												>
													Redo
												</Button>
												<Button
													style={{ flex: 1 }}
													onClick={clearCanvas}
													startContent={<CircleX />}
												>
													Clear
												</Button>
											</div>
											<div className="flex flex-row items-center gap-4">
												<label htmlFor="color-picker">Color picker: </label>
												<input
													id="color-picker"
													type="color"
													onChange={(e) => {
														setBrushColor(e.target.value + alpha);
														setColor(e.target.value);
													}}
												/>
											</div>
											<Slider
												label="Brush Size"
												step={1}
												maxValue={100}
												value={brushSize}
												onChange={(value) => {
													setLineWidth(value);
													setBrushSize(value);
												}}
												minValue={0}
												className="max-w-md"
											/>
											<Slider
												label="Alpha"
												step={1}
												maxValue={100}
												value={alpha}
												onChange={(value) => {
													setAlpha(value);
													setBrushColor(`${color}${alphaValues[value]}`);
												}} // setAlpha(value)
												minValue={0}
												defaultValue={10}
												className="max-w-md"
											/>

											<div className="flex flex-row w-full gap-3">
												<Button
													onClick={(e) => {
														triggerSave(e);
														setShowDownload(true);
													}}
													className=""
													color="primary"
													style={{ flex: 1 }}
												>
													Save Changes
												</Button>
												{imageDownloadUrl && showDownload && (
													<Button
														as={Link}
														download
														href={imageDownloadUrl}
														style={{ flex: 1 }}
														variant="bordered"
														color="primary"
													>
														Download
													</Button>
												)}
											</div>
										</div>
									</div>
								)}
							/>
						</ModalBody>
						<ModalFooter></ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default TeethDiagram;
const alphaValues = [
	"00",
	"03",
	"05",
	"08",
	"0A",
	"0D",
	"0F",
	"12",
	"14",
	"17",
	"1A",
	"1C",
	"1F",
	"21",
	"24",
	"26",
	"29",
	"2B",
	"2E",
	"30",
	"33",
	"36",
	"38",
	"3B",
	"3D",
	"40",
	"42",
	"45",
	"47",
	"4A",
	"4D",
	"4F",
	"52",
	"54",
	"57",
	"59",
	"5C",
	"5E",
	"61",
	"63",
	"66",
	"69",
	"6B",
	"6E",
	"70",
	"73",
	"75",
	"78",
	"7A",
	"7D",
	"80",
	"82",
	"85",
	"87",
	"8A",
	"8C",
	"8F",
	"91",
	"94",
	"96",
	"99",
	"9C",
	"9E",
	"A1",
	"A3",
	"A6",
	"A8",
	"AB",
	"AD",
	"B0",
	"B3",
	"B5",
	"B8",
	"BA",
	"BD",
	"BF",
	"C2",
	"C4",
	"C7",
	"C9",
	"CC",
	"CF",
	"D1",
	"D4",
	"D6",
	"D9",
	"DB",
	"DE",
	"E0",
	"E3",
	"E6",
	"E8",
	"EB",
	"ED",
	"F0",
	"F2",
	"F5",
	"F7",
	"FA",
	"FC",
	"FF",
];
