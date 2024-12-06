import { decrypt } from "@/lib/utils";
import InventoryAPIManager from "@/services/api/managers/inventory/InventoryAPIManager";
import { useAppStore, useAuthTokenPersisted } from "@/store/zustand";
import {
	Breadcrumbs,
	BreadcrumbItem,
	Input,
	Select,
	SelectItem,
	Textarea,
	Button,
} from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AddItem = () => {
	const location = useLocation();
	const currentUser = location.pathname.includes("admin") ? "admin" : "staff";
	const { alertDialogDetails, setAlertDialogDetails } = useAppStore();
	const navigate = useNavigate();
	const { authToken } = useAuthTokenPersisted();
	const user = decrypt(authToken);

	const { data: itemGroups } = useQuery({
		queryKey: ["itemGroups"],
		queryFn: InventoryAPIManager.getInventoryGroups,
	});

	const mutation = useMutation({
		mutationFn: InventoryAPIManager.postAddItem,
		onSuccess: (data) => {
			setAlertDialogDetails({
				isOpen: true,
				title: "Success",
				message: "Item added successfully",
				type: "success",
				confirmCallback: () => {
					navigate(`/${currentUser}/inventory/item-list`);
				},
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
	// Form hook
	const {
		register,
		handleSubmit,
		control,
		setError,
		formState: { errors },
	} = useForm({
		defaultValues: {
			NAME: "",
			ITEM_GROUP: "",
			QUANTITY: null,
			LOCATION: "",
		},
	});
	const onSubmit = (data) => {
		data.EMPLOYEE_NAME = user.fullname;
		data.EMPLOYEE_ID = user.id;
		data.LOCATION = "N/A";
		mutation.mutate(data);
	};
	return (
		<div style={{ flex: 1 }} className="">
			<div style={{ flex: 1 }} className="relative p-4 bg-white">
				<div className="p-2 md:p-5 font-darkText">
					<Breadcrumbs size="lg">
						<BreadcrumbItem href={`/${currentUser}/inventory`}>
							Inventory
						</BreadcrumbItem>
						<BreadcrumbItem href={`/${currentUser}/inventory/item-list`}>
							Item List
						</BreadcrumbItem>
						<BreadcrumbItem href={`/${currentUser}/inventory/item-list`}>
							Add new Item
						</BreadcrumbItem>
					</Breadcrumbs>
				</div>
				<div className="mt-7">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="max-w-[1200px] ps-0 md:ps-6 2xl:ps-24 flex flex-col gap-5">
							<div className="flex flex-row gap-7">
								<Input
									{...register("NAME", {
										required: "Item Name is required",
									})}
									isInvalid={!!errors.NAME}
									errorMessage={errors.NAME?.message}
									type="text"
									label="Item Name"
									size="lg"
									variant="bordered"
									color="primary"
									className="w-full"
									classNames={{
										label: "text-darkText font-semibold ",
										inputWrapper:
											"rounded-lg h-full bg-[#e3ebf3] border-1 border-[#1D242E]",
										mainWrapper: "min-h-[4rem]",
									}}
									placeholder=" "
									labelPlacement={"outside"}
								/>
							</div>
							<div className="flex flex-col items-start gap-5 md:flex-row md:gap-7">
								<Controller
									name="ITEM_GROUP"
									control={control}
									rules={{ required: "Group is required" }}
									render={({ field, formState: { errors } }) => (
										<Select
											{...field}
											selectedKeys={[field.value]}
											onChange={(selectedKeys) => {
												field.onChange(selectedKeys);
											}}
											isInvalid={!!errors.ITEM_GROUP}
											errorMessage={errors.ITEM_GROUP?.message}
											labelPlacement={"outside"}
											placeholder="Select Group"
											label="Item Group"
											size="lg"
											variant="bordered"
											color="primary"
											radius="sm"
											className="w-full "
											disabledKeys={[""]}
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper: "rounded-lg h-full ",
												trigger:
													"h-[4rem] border-1 border-[#1D242E] bg-[#e3ebf3]",
											}}
										>
											{itemGroups?.map((item) => (
												<SelectItem key={item.NAME} value={item.NAME}>
													{item.NAME === ""
														? "- Select Group -"
														: item.NAME}
												</SelectItem>
											))}
										</Select>
									)}
								/>
								<Input
									{...register("QUANTITY", {
										required: "Quantity is required",
										pattern: {
											value: /^[0-9]*$/,
											message: "Quantity must be a number",
										},
									})}
									isInvalid={!!errors.QUANTITY}
									errorMessage={errors.QUANTITY?.message}
									type="number"
									label="Quantity in number"
									size="lg"
									variant="bordered"
									color="primary"
									className="w-full"
									classNames={{
										label: "text-darkText font-semibold ",
										inputWrapper:
											"rounded-lg min-h-[4rem] bg-[#e3ebf3] border-1 border-[#1D242E]",
										mainWrapper: "min-h-[4rem]",
									}}
									placeholder=" "
									labelPlacement={"outside"}
								/>
							</div>
							{/*<Textarea*/}
							{/*	{...register("LOCATION", {*/}
							{/*		required: "Location is required",*/}
							{/*	})}*/}
							{/*	isInvalid={!!errors.LOCATION}*/}
							{/*	errorMessage={errors.LOCATION?.message}*/}
							{/*	variant={"bordered"}*/}
							{/*	label="Location"*/}
							{/*	radius="sm"*/}
							{/*	size="lg"*/}
							{/*	color="primary"*/}
							{/*	labelPlacement="outside"*/}
							{/*	classNames={{*/}
							{/*		label: "text-darkText font-semibold text-base",*/}
							{/*		inputWrapper:*/}
							{/*			"rounded-lg h-full bg-[#e3ebf3] border-1 border-[#1D242E]",*/}
							{/*		mainWrapper: "h-[4rem]",*/}
							{/*	}}*/}
							{/*	placeholder=" "*/}
							{/*	className="col-span-12 mb-6 md:col-span-6 md:mb-0"*/}
							{/*/>*/}
							<div>
								<Button color="primary" type="submit" className="px-8 text-base">
									Save Details
								</Button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddItem;
