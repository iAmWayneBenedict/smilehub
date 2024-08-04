// DropFileInput.jsx
import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";
import { Button } from "@nextui-org/react";

const DropFileInput = (props) => {
	const wrapperRef = useRef(null);

	const [fileList, setFileList] = useState([]);

	const onDragEnter = () => wrapperRef.current.classList.add("dragover");

	const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

	const onDrop = () => wrapperRef.current.classList.remove("dragover");

	// on file drop
	const onFileDrop = (e) => {
		const newFile = e.target.files[0];
		if (newFile) {
			const updatedList = [...fileList, newFile];
			setFileList(updatedList);
			props.onFileChange(updatedList);
		}
	};

	// on file remove
	const fileRemove = (file) => {
		const updatedList = [...fileList];
		updatedList.splice(fileList.indexOf(file), 1);
		setFileList(updatedList);
		props.onFileChange(updatedList);
	};

	return (
		<>
			<div
				ref={wrapperRef}
				className="relative w-[40vw] h-48 border-[4px] hover:opacity-60 border-[#D9D9D9] border-dotted rounded-[8px] flex flex-col justify-center items-center cursor-pointer"
				onDragEnter={onDragEnter}
				onDragLeave={onDragLeave}
				onDrop={onDrop}
			>
				<div className="text-center flex flex-row gap-4 items-center text-[#cccccc] font-semibold p-[10px]">
					<Button color="primary" className="px-8 rounded-3xl">
						Upload
					</Button>
					<p>Drag & Drop your files here</p>
				</div>
				<input
					type="file"
					value=""
					className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer "
					onChange={onFileDrop}
				/>
			</div>
			{fileList.length > 0 ? (
				<div className="mt-[30px] w-[40vw]">
					<p className="mb-[20px]">Ready to upload</p>
					{fileList.map((item, index) => (
						<div
							key={index}
							className="relative flex mb-[10px] bg-[#f5f8ff] p-[15px] rounded-[20px]"
						>
							<div className="flex flex-col justify-between">
								<p>{item.name}</p>
								<p>{item.size}B</p>
							</div>
							<Button
								isIconOnly
								onClick={() => fileRemove(item)}
								className="absolute -translate-y-1/2 top-1/2 right-5"
							>
								<X />
							</Button>
						</div>
					))}
				</div>
			) : null}
		</>
	);
};

DropFileInput.propTypes = {
	onFileChange: PropTypes.func,
};

export default DropFileInput;
