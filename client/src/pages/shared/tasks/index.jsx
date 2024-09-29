import {
	Breadcrumbs,
	BreadcrumbItem,
	Button,
	Divider,
	Checkbox,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
} from "@nextui-org/react";
import {
	Plus,
	Filter,
	CircleHelp,
	Star,
	Ellipsis,
	Check,
	SquarePen,
	Clock,
	Trash,
	Tag,
} from "lucide-react";
import { useAppStore } from "@/store/zustand.js";
import TasksModal from "@/components/layout/Modals/TasksModal.jsx";
import { useState } from "react";
import TasksAPIManager from "@/services/api/managers/task/TasksAPIManager";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { cn, formatDate, formatDateByDayAndShortMonth, isTodayDate } from "@/lib/utils";

const Tasks = () => {
	const { setTaskModal, setAlertDialogDetails } = useAppStore();
	const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));
	const [hasSelectedFilter, setHasSelectedFilter] = useState(false);
	const [selectedTask, setSelectedTask] = useState(null);
	const [taskData, setTaskData] = useState(null);
	const [isSelectedCheckbox, setIsSelectedCheckbox] = useState({});

	const getMutation = useMutation({
		mutationFn: TasksAPIManager.getTask,
		onSuccess: (data) => {
			setTaskModal({ isOpen: false });
			setTaskData(data);
			refetch();
		},
	});

	const updateMutation = useMutation({
		mutationFn: TasksAPIManager.postEditTask,
		onSuccess: (data) => {
			setTaskModal({ isOpen: false });
			refetch();
		},
	});

	const deleteMutation = useMutation({
		mutationFn: TasksAPIManager.postDeleteTask,
		onSuccess: () => {
			refetch();
			setSelectedTask(null);
			setIsSelectedCheckbox({});
			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: "Task deleted successfully.",
			});
		},
	});

	const { data, isSuccess, isLoading, refetch } = useQuery({
		queryKey: ["tasks", selectedKeys, hasSelectedFilter],
		queryFn: () => {
			console.log(selectedKeys);
			if (selectedKeys.has("text") || !hasSelectedFilter) {
				return TasksAPIManager.getTasks();
			}
			return TasksAPIManager.getTasks({ status: Array.from(selectedKeys)[0] });
		},
	});

	useEffect(() => {
		// console.log(selectedKeys);
	}, [selectedKeys]);
	const currentUser = location.pathname.includes("admin") ? "admin" : "staff";
	return (
		<div style={{ flex: 1 }} className="bg-[#f9f9f9]">
			<div className="w-full h-full p-5">
				<h3 className="p-5 text-lg font-darkText">
					<Breadcrumbs size="lg">
						<BreadcrumbItem href={`/${currentUser}/tasks`}>Tasks</BreadcrumbItem>
						<BreadcrumbItem href={`/${currentUser}/tasks`}>Task</BreadcrumbItem>
					</Breadcrumbs>
				</h3>
				<div className="flex flex-col xl:flex-row gap-7">
					<div style={{ flex: 1 }} className="flex flex-col gap-7">
						<div className="flex items-center justify-between py-3 bg-white px-7">
							<div>
								<h3 className="~text-lg/2xl font-semibold">
									To be completed <span>({data?.length || 0})</span>
								</h3>
							</div>
							<div className="flex gap-3">
								<Button
									isIconOnly
									variant="bordered"
									radius="sm"
									size="lg"
									onClick={() =>
										setTaskModal({
											isOpen: true,
											title: "Add Task",
											data: null,
											refetch,
											confirmCallback: () => {
												setSelectedTask(null);
												setIsSelectedCheckbox({});
											},
										})
									}
								>
									<Plus />
								</Button>
								<Dropdown>
									<DropdownTrigger>
										<Button isIconOnly variant="bordered" radius="sm" size="lg">
											<Filter />
										</Button>
									</DropdownTrigger>
									<DropdownMenu
										aria-label="Single selection example"
										variant="flat"
										closeOnSelect={false}
										selectionMode="single"
										selectedKeys={selectedKeys}
										onSelectionChange={(keys) => {
											setSelectedKeys(keys);
											if (keys.size === 0) {
												setHasSelectedFilter(false);
											} else {
												setHasSelectedFilter(true);
											}
										}}
									>
										<DropdownItem key="Pending">Pending</DropdownItem>
										<DropdownItem key="On-going">On-going</DropdownItem>
										<DropdownItem key="Completed">Completed</DropdownItem>
									</DropdownMenu>
								</Dropdown>

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
							<div className="flex flex-col gap-5 py-5 px-7 min-h-96">
								{isSuccess &&
									data?.map((task, i) => (
										<div
											key={i}
											className="flex flex-row justify-between gap-2 mb-3 cursor-pointer"
											onClick={() => {
												setSelectedTask(task);
												setIsSelectedCheckbox((prev) => ({
													...Object.keys(prev).reduce((acc, key) => {
														acc[key] = false;
														return acc;
													}, {}),
													[task.ID]: true,
												}));
											}}
										>
											<Checkbox
												size="lg"
												className="w-96"
												isSelected={isSelectedCheckbox[task.ID] || false}
												onValueChange={() => {
													setSelectedTask(task);
													setIsSelectedCheckbox((prev) => ({
														...Object.keys(prev).reduce((acc, key) => {
															acc[key] = false;
															return acc;
														}, {}),
														[task.ID]: true,
													}));
												}}
												// isReadOnly
												classNames={{
													wrapper: "mr-5",
												}}
											>
												<div className="flex flex-col">
													<span className="text-xl font-semibold">
														{task.TITLE}
													</span>
													<small>
														{isTodayDate(new Date(task.DATETIME))
															? "Today"
															: formatDate(new Date(task.DATETIME))}
													</small>
												</div>
											</Checkbox>
											<div className="flex items-center gap-2">
												{/* <Button variant="bordered" isIconOnly>
													<Ellipsis color="#5777BD" />
												</Button> */}
												<p className="~text-xs/base">{task.STATUS}</p>
												<div
													className={cn(
														"~w-2/3 ~h-2/3 rounded-full",
														task.STATUS === "Pending" &&
															"bg-yellow-500",
														task.STATUS === "On-going" && "bg-blue-500",
														task.STATUS === "Completed" &&
															"bg-green-500"
													)}
												></div>
											</div>
										</div>
									))}
								{(data?.length === 0 || isLoading) && (
									<div className="flex flex-col items-center justify-center h-full">
										<p className="text-lg">No tasks available</p>
									</div>
								)}
							</div>
						</div>
					</div>
					<div style={{ flex: 1 }} className="flex flex-col gap-7">
						<div className="flex items-center justify-between py-3 bg-white px-7">
							<div>
								<h3 className="~text-lg/2xl font-semibold">
									{!selectedTask ? (
										"Task Details"
									) : (
										<>
											Task #<span>{selectedTask?.ID}</span>
										</>
									)}
								</h3>
							</div>
							<div className="flex gap-3">
								<Button
									isIconOnly
									variant="bordered"
									radius="sm"
									size="lg"
									isDisabled={
										!selectedTask || selectedTask?.STATUS === "Completed"
									}
									onClick={() =>
										setAlertDialogDetails({
											isOpen: true,
											dialogType: "confirm",
											type: "info",
											title: "Info!",
											message: "Are you sure you want to complete this task?",

											confirmCallback: () => {
												updateMutation.mutate({
													...selectedTask,
													STATUS: "Completed",
												});
											},
										})
									}
								>
									<Check color="#27AE60" />
								</Button>
								<Button
									isIconOnly
									variant="bordered"
									radius="sm"
									size="lg"
									isDisabled={!selectedTask}
									onClick={() =>
										setTaskModal({
											isOpen: true,
											title: "Update Task",
											data: selectedTask,
											refetch,
											confirmCallback: () => {
												setSelectedTask(null);
												setIsSelectedCheckbox({});
											},
										})
									}
								>
									<SquarePen />
								</Button>
								<Button
									isIconOnly
									variant="bordered"
									radius="sm"
									size="lg"
									isDisabled={!selectedTask}
									onClick={() =>
										setAlertDialogDetails({
											isOpen: true,
											dialogType: "confirm",
											type: "danger",
											title: "Danger!",
											message: "Are you sure you want to delete this task?",
											confirmCallback: () => {
												deleteMutation.mutate({
													ID: selectedTask?.ID,
												});
											},
										})
									}
								>
									<Trash color="#EB5757" />
								</Button>
							</div>
						</div>
						{selectedTask && (
							<div className="flex flex-col bg-white ">
								<div className="flex gap-3 py-5 px-7">
									<h3 className="~text-lg/2xl font-bold">
										{selectedTask?.TITLE}
									</h3>
								</div>
								<Divider />
								<div className="flex flex-col gap-5 ">
									<p className="py-5 text-lg px-7">{selectedTask?.DESCRIPTION}</p>
									<div className="flex flex-row items-center gap-3 px-7">
										<Clock color="#27AE60" />
										<span>
											{isTodayDate(new Date(selectedTask?.DATETIME))
												? "Today"
												: formatDate(new Date(selectedTask?.DATETIME))}
										</span>
									</div>
									<Divider />
									<div className="flex flex-row items-center gap-3 px-7">
										<Tag color="#EB5757" />
										<span>{selectedTask?.STATUS}</span>
									</div>
									<div className="flex gap-5 mt-2 mb-7 px-7">
										<span>{selectedTask?.CREATOR} created a task.</span>{" "}
										<span className="text-lightText">
											{formatDateByDayAndShortMonth(
												new Date(selectedTask?.DATETIME)
											)}
										</span>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<TasksModal />
		</div>
	);
};

export default Tasks;
