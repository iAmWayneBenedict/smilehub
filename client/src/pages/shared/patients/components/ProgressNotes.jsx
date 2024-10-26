import { Breadcrumbs, BreadcrumbItem, Button } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { useAppStore } from "@/store/zustand.js";
import ProgressNoteModal from "@/components/layout/Modals/ProgressNoteModal.jsx";
import { useMutation } from "@tanstack/react-query";
import PatientsAPIManager from "@/services/api/managers/patients/PatientsAPIManager";
import { useEffect } from "react";
import { useState } from "react";
import { formatDate } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Eye } from "lucide-react";

const ProgressNotes = () => {
	const params = useParams();
	const { setAddProgressNoteModal, setAlertDialogDetails } = useAppStore();
	const [progressNotes, setProgressNotes] = useState(null);

	const getAllProgressNotes = useMutation({
		mutationFn: PatientsAPIManager.getProgressNotes,
		onSuccess: (data) => {
			setProgressNotes(data);
		},
	});

	const deleteMutation = useMutation({
		mutationFn: PatientsAPIManager.postDeleteProgressNotes,
		onSuccess: () => {
			getAllProgressNotes.mutate({ PATIENT_ID: params?.id });
			setAlertDialogDetails({
				isOpen: true,
				title: "Success",
				message: "Progress Note deleted successfully",
				type: "success",
			});
		},
		onError: (error) => {
			setAlertDialogDetails({
				isOpen: true,
				title: "Error",
				message: error?.response?.data?.message || "An error occurred",
				type: "danger",
			});
		},
	});

	useEffect(() => {
		getAllProgressNotes.mutate({ PATIENT_ID: params?.id });
	}, [params]);
	const currentUser = location.pathname.includes("admin") ? "admin" : "staff";
	return (
		<div style={{ flex: 1 }} className="bg-white">
			<div className="w-full h-full">
				<h3 className="p-5 text-lg font-darkText">
					<Breadcrumbs size="lg">
						<BreadcrumbItem href={`/${currentUser}/patients`}>Patients</BreadcrumbItem>
						<BreadcrumbItem href={`/${currentUser}/patients/info/` + params?.id}>
							Patient Information
						</BreadcrumbItem>
						<BreadcrumbItem href={`/${currentUser}/patients/progress-notes`}>
							Progress Notes
						</BreadcrumbItem>
					</Breadcrumbs>
				</h3>
				<div className="flex flex-col gap-3">
					<div className="w-full p-6 ~px-12/36 bg-white">
						<div className="flex justify-end w-full mb-6">
							<Button
								color={"primary"}
								onClick={() => {
									setAddProgressNoteModal({
										title: "Add Progress Notes",
										isOpen: true,
										data: {
											PATIENT_ID: params?.id,
										},
									});
								}}
								isDisabled={currentUser === "staff"}
							>
								Add Progress
							</Button>
						</div>
						<table className="w-full border-separate table-fixed border-spacing-0">
							<thead>
								<tr>
									<th className="border border-[#5B5B5B] bg-[#BAD7FF] py-2 rounded-tl-md  border-r-0">
										Progress Notes
									</th>
									<th className="border border-[#5B5B5B] bg-[#BAD7FF] py-2 rounded-tr-md">
										Date
									</th>
								</tr>
							</thead>
							<tbody>
								{progressNotes &&
									progressNotes.map((item, i) => (
										<tr key={i}>
											<td className="border border-[#5B5B5B] h-[7rem] px-4 border-r-0 border-t-0">
												<p className="line-clamp-3">{item.DIAGNOSIS}</p>			
											</td>
											<td className="border border-[#5B5B5B] h-[7rem] px-4 flex justify-between items-center border-t-0">
												{formatDate(new Date(item.DATE))}
												<div className="flex gap-1">
													<Button
														isIconOnly
														variant="light"
														size="sm"
														onClick={() => {
															setAddProgressNoteModal({
																title: "View Progress Notes",
																isOpen: true,
																data: item,

																confirmCallback: (data) => {},
															});
														}}
													>
														<Eye size={20} />
													</Button>
													<Button
														isIconOnly
														variant="light"
														size="sm"
														onClick={() => {
															setAddProgressNoteModal({
																title: "Edit Progress Notes",
																isOpen: true,
																data: item,

																confirmCallback: (data) => {},
															});
														}}
														isDisabled={currentUser === "staff"}
													>
														<Pencil size={20} />
													</Button>
													<Button
														isIconOnly
														variant="light"
														color="danger"
														size="sm"
														onClick={() => {
															setAlertDialogDetails({
																isOpen: true,
																title: "Delete Progress Note",
																message:
																	"Are you sure you want to delete this Progress Note?",
																type: "danger",
																dialogType: "confirm",
																confirmCallback: () => {
																	deleteMutation.mutate({
																		ID: item.ID,
																	});
																},
															});
														}}
														isDisabled={currentUser === "staff"}
													>
														<Trash2 size={20} />
													</Button>
												</div>
											</td>
										</tr>
									))}
								{!progressNotes && (
									<tr>
										<td
											colSpan={2}
											className="border border-[#5B5B5B] h-24 border-t-0 text-center"
										>
											No Progress Notes
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<ProgressNoteModal />
		</div>
	);
};

export default ProgressNotes;
