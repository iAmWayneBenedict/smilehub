import { Breadcrumbs, BreadcrumbItem, Button, Divider, Checkbox } from "@nextui-org/react";
import {
	Plus,
	Filter,
	CircleHelp,
	Star,
	Ellipsis,
	Check,
	RotateCw,
	SquarePen,
	Clock,
	Trash,
	Tag,
} from "lucide-react";

const Tasks = () => {
	return (
		<div style={{ flex: 1 }} className="bg-[#f9f9f9]">
			<div className="w-full h-full p-5">
				<h3 className="p-5 text-lg font-darkText">
					<Breadcrumbs size="lg">
						<BreadcrumbItem href="/admin/tasks">Tasks</BreadcrumbItem>
						<BreadcrumbItem href="/admin/tasks">Task</BreadcrumbItem>
					</Breadcrumbs>
				</h3>
				<div className="flex flex-col xl:flex-row gap-7">
					<div style={{ flex: 1 }} className="flex flex-col gap-7">
						<div className="flex items-center justify-between py-3 bg-white px-7">
							<div>
								<h3 className="~text-lg/2xl font-semibold">
									To be completed <span>(4)</span>
								</h3>
							</div>
							<div className="flex gap-3">
								<Button isIconOnly variant="bordered" radius="sm" size="lg">
									<Plus />
								</Button>
								<Button isIconOnly variant="bordered" radius="sm" size="lg">
									<Filter />
								</Button>
								<Button isIconOnly variant="bordered" radius="sm" size="lg">
									<CircleHelp />
								</Button>
							</div>
						</div>
						<div className="flex flex-col bg-white ">
							<div className="flex gap-3 py-5 px-7">
								<Star size={30} fill="#ffce31" color="#ffce31" />
								<h3 className="~text-lg/2xl font-bold">New</h3>
							</div>
							<Divider />
							<div className="flex flex-col gap-5 py-5 px-7">
								{Array.from({ length: 4 }).map((_, i) => (
									<div
										key={i}
										className="flex flex-row justify-between gap-2 mb-3"
									>
										<Checkbox
											size="lg"
											className="w-96"
											classNames={{
												wrapper: "mr-5",
											}}
										>
											<div className="flex flex-col">
												<span className="text-xl font-semibold">
													Check the patient's teeth
												</span>
												<small>Today</small>
											</div>
										</Checkbox>
										<div>
											<Button variant="bordered" isIconOnly>
												<Ellipsis color="#5777BD" />
											</Button>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
					<div style={{ flex: 1 }} className="flex flex-col gap-7">
						<div className="flex items-center justify-between py-3 bg-white px-7">
							<div>
								<h3 className="~text-lg/2xl font-semibold">
									Task #<span>1</span>
								</h3>
							</div>
							<div className="flex gap-3">
								<Button isIconOnly variant="bordered" radius="sm" size="lg">
									<Check color="#27AE60" />
								</Button>
								<Button isIconOnly variant="bordered" radius="sm" size="lg">
									<RotateCw />
								</Button>
								<Button isIconOnly variant="bordered" radius="sm" size="lg">
									<SquarePen />
								</Button>
								<Button isIconOnly variant="bordered" radius="sm" size="lg">
									<Trash color="#EB5757" />
								</Button>
							</div>
						</div>
						<div className="flex flex-col bg-white ">
							<div className="flex gap-3 py-5 px-7">
								<h3 className="~text-lg/2xl font-bold">
									Call patients who missed their appointments
								</h3>
							</div>
							<Divider />
							<div className="flex flex-col gap-5 ">
								<p className="py-5 text-lg px-7">
									Follow up with patients after major procedures to check on their
									recovery and address any concerns.
								</p>
								<div className="flex flex-row items-center gap-3 px-7">
									<Clock color="#27AE60" />
									<span>Today</span>
								</div>
								<Divider />
								<div className="flex flex-row items-center gap-3 px-7">
									<Tag color="#EB5757" />
									<span>Urgent</span>
								</div>
								<div className="flex gap-5 mt-2 mb-7 px-7">
									<span>Nalyn Baguno created a task.</span>{" "}
									<span className="text-lightText">16 Apr</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Tasks;
