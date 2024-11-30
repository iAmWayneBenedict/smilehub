import React from "react";

import logoIcon from "../../../../assets/icons/LOGO.png";
import logoText from "../../../../assets/icons/SMILEHUB.png";
import PatientsAPIManager from "@/services/api/managers/patients/PatientsAPIManager";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { decrypt, formatDate } from "@/lib/utils";
import { useAuthTokenPersisted } from "@/store/zustand.js";
const PrintProgress = () => {
	const params = useParams();
	const [progressNotes, setProgressNotes] = useState([]);
	
	const {authToken} = useAuthTokenPersisted();
	const user = decrypt(authToken);

	const getAllProgressNotes = useMutation({
		mutationFn: PatientsAPIManager.getProgressNotes,
		onSuccess: (data) => {
			setProgressNotes(data);
		},
	});

	const { data, isSuccess, isLoading, refetch } = useQuery({
		enabled: !!params?.id || !!user?.id,
		queryKey: ["employee-detail"],
		queryFn: () =>
			PatientsAPIManager.getDetailPatient({
				ID: params?.id || user?.id,
			}),
	});

	useEffect(() => {
		getAllProgressNotes.mutate({ PATIENT_ID: params?.id || user?.id });
	}, []);
	return (
		<div className="w-full overflow-scroll absolute inset-0 z-[-9999] opacity-0">
			<div className="w-[1200px] ml-[5%] overflow-y-scroll bg-white">
				<section id="print-progress" className="container p-6 mx-auto font-mono">
					<div className="w-full">
						<div className="w-full overflow-x-auto">
							<center>
								<div className="flex items-center justify-center gap-3 h-[2.5rem] sm:h-[3rem] md:h-fit">
									<img src={logoIcon} alt="logo-icon" className="h-full" />
									<div className="h-[1rem] sm:h-[1.35rem] md:h-fit">
										<img src={logoText} className="h-full" alt="logo-text" />
									</div>
								</div>
							</center>
							<br />
							<br />
							<br />
							<div className="px-10 text-2xl font-bold text-primary">
								Patient Information
							</div>
							<div className="flex w-full gap-4 px-10 mt-5">
								<div style={{ flex: 1 }} className="flex flex-col">
									<div className="flex flex-row gap-2">
										<p className="font-bold">Patient: </p>
										<p>{data?.FIRSTNAME + " " + data?.LASTNAME}</p>
									</div>
									<div className="flex flex-row gap-2">
										<p className="font-bold">Phone: </p>
										<p>0{data?.PHONE}</p>
									</div>
									<div className="flex flex-row gap-2">
										<p className="font-bold">Email: </p>
										<p>{data?.EMAIL}</p>
									</div>
								</div>
								<div style={{ flex: 1 }} className="flex flex-col">
									<div className="flex flex-row gap-2">
										<p className="font-bold">Birth date: </p>
										<p>{formatDate(new Date(data?.BIRTHDATE))}</p>
									</div>
									<div className="flex flex-row gap-2">
										<p className="font-bold">Gender: </p>
										<p>{data?.GENDER}</p>
									</div>
								</div>
							</div>
							<br />
							<br />
							<table className="w-full">
								<thead>
									<tr className="font-semibold tracking-wide text-left text-gray-900 uppercase bg-gray-100 border-b border-gray-600 text-md">
										<th className="px-4 py-3">Date</th>
										<th className="px-4 py-3">Complaint</th>
										<th className="px-4 py-3">History Update</th>
										<th className="px-4 py-3">Diagnosis</th>
										<th className="px-4 py-3">Treatment Plan</th>
										<th className="px-4 py-3">Procedures</th>
										<th className="px-4 py-3">Instruction</th>
										<th className="px-4 py-3">Response</th>
									</tr>
								</thead>
								<tbody className="bg-white">
									{progressNotes.map((note, key) => (
										<tr key={key} className="text-gray-700">
											<td className="px-4 py-3 text-sm border">
												{note.DATE.split(" ")[0]}
											</td>
											<td className="px-4 py-3 text-sm border">
												{note.COMPLAINT}
											</td>
											<td className="px-4 py-3 text-sm border">
												{note.HISTORY_UPDATE}
											</td>
											<td className="px-4 py-3 text-sm border">
												{note.DIAGNOSIS}
											</td>
											<td className="px-4 py-3 text-sm border">
												{note.TREATMENT_PLAN}
											</td>
											<td className="px-4 py-3 text-sm border">
												{note.PROCEDURES}
											</td>
											<td className="px-4 py-3 text-sm border">
												{note.INSTRUCTION}
											</td>
											<td className="px-4 py-3 text-sm border">
												{note.RESPONSE}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default PrintProgress;
