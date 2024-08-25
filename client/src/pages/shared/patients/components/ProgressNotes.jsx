import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useParams } from "react-router-dom";

const ProgressNotes = () => {
	const params = useParams();
	return (
		<div style={{ flex: 1 }} className="bg-white">
			<div className="w-full h-full">
				<h3 className="p-5 text-lg font-darkText">
					<Breadcrumbs size="lg">
						<BreadcrumbItem href="/admin/patients">Patients</BreadcrumbItem>
						<BreadcrumbItem href={"/admin/patients/info/" + params?.id}>
							Patient Information
						</BreadcrumbItem>
						<BreadcrumbItem href="/admin/patients/progress-notes">
							Progress Notes
						</BreadcrumbItem>
					</Breadcrumbs>
				</h3>
				<div className="flex flex-col gap-3">
					<div className="w-full p-6 ~px-12/36 bg-white">
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
								{/* {progressItems.map((item) => (
									<tr key={item.key}>
										<td className="border border-[#5B5B5B] py-2 px-4 border-r-0 border-t-0">
											{item.progress_note}
										</td>
										<td className="border border-[#5B5B5B] py-2 px-4  border-t-0">
											{item.date}
										</td>
									</tr>
								))} */}
								{Array.from({ length: 30 }).map((_, i) => (
									<tr key={i}>
										<td className="border border-[#5B5B5B] h-10 px-4 border-r-0 border-t-0">
											{progressItems[i]?.progress_note}
										</td>
										<td className="border border-[#5B5B5B] h-10 px-4  border-t-0">
											{progressItems[i]?.date}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProgressNotes;

const progressItems = [
	{
		id: 1,
		progress_note: "Patient is doing well",
		date: "2021-10-10",
	},
	{
		id: 2,
		progress_note: "Patient is doing well",
		date: "2021-10-10",
	},
	{
		id: 3,
		progress_note: "Patient is doing well",
		date: "2021-10-10",
	},
	{
		id: 4,
		progress_note: "Patient is doing well",
		date: "2021-10-10",
	},
	{
		id: 5,
		progress_note: "Patient is doing well",
		date: "2021-10-10",
	},
	{
		id: 6,
		progress_note: "Patient is doing well",
		date: "2021-10-10",
	},
	{
		id: 7,
		progress_note: "Patient is doing well",
		date: "2021-10-10",
	},
	{
		id: 8,
		progress_note: "Patient is doing well",
		date: "2021-10-10",
	},
	{
		id: 9,
		progress_note: "Patient is doing well",
		date: "2021-10-10",
	},
	{
		id: 10,
		progress_note: "Patient is doing well",
		date: "2021-10-10",
	},
	{
		id: 11,
		progress_note: "Patient is doing well",
		date: "2021-10-10",
	},
	{
		id: 12,
		progress_note: "Patient is doing well",
		date: "2021-10-10",
	},
	{
		id: 13,
		progress_note: "Patient is doing well",
		date: "2021-10-10",
	},
	{
		id: 14,
		progress_note: "Patient is doing well",
		date: "2021-10-10",
	},
	{
		id: 15,
		progress_note: "Patient is doing well",
		date: "2021-10-10",
	},
	{
		id: 16,
		progress_note: "Patient is doing well",
		date: "2021-10-10",
	},
	{
		id: 17,
		progress_note: "Patient is doing well",
		date: "2021-10-10",
	},
	{
		id: 18,
		progress_note: "Patient is doing well",
		date: "2021-10-10",
	},
];
