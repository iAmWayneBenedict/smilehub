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
import { useMemo } from "react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const EditItemShortage = () => {
	const location = useLocation();
	const currentUser = location.pathname.includes("admin") ? "admin" : "staff";
	const { alertDialogDetails, setAlertDialogDetails } = useAppStore();
	const navigate = useNavigate();
	const params = useParams();
	const { authToken } = useAuthTokenPersisted();
	const user = decrypt(authToken);

	// Form hook
	const {
		register,
		handleSubmit,
		control,
		setError,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: useMemo(() => {
			return {
				NAME: "",
				ITEM_GROUP: "",
				QUANTITY: "",
				LOCATION: "",
			};
		}, []),
	});

	const { data: itemGroups } = useQuery({
		queryKey: ["itemGroups"],
		queryFn: InventoryAPIManager.getInventoryGroups,
	});

	const getMutation = useMutation({
		mutationFn: InventoryAPIManager.getInventoryItem,
		onSuccess: (data) => {
			reset(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

	useEffect(() => {
		getMutation.mutate({
			ID: params.id,
		});
	}, []);

	const mutation = useMutation({
		mutationFn: InventoryAPIManager.postEditItem,
		onSuccess: (data) => {
			setAlertDialogDetails({
				isOpen: true,
				title: "Success",
				message: "Item added successfully",
				type: "success",
				confirmCallback: () => {
					navigate(`/${currentUser}/inventory/item-list-shortage/${params.id}`);
				},
			});
		},
		onError: (error) => {
			console.log(error);
			setAlertDialogDetails({
				isOpen: true,
				title: "Error",
				message: error?.message || "An error occurred",
				type: "danger",
			});
		},
	});

	const onSubmit = (data) => {
		data.EMPLOYEE_NAME = user.fullname;
		data.EMPLOYEE_ID = user.id;
		mutation.mutate(data);
	};
	return (
		<div style={{ flex: 1 }} className="">
			<div style={{ flex: 1 }} className="relative p-4 bg-white">
				<div className="p-5 font-darkText">
					<Breadcrumbs size="lg">
						<BreadcrumbItem href={`/${currentUser}/inventory`}>
							Inventory
						</BreadcrumbItem>
						<BreadcrumbItem href={`/${currentUser}/inventory/item-list-shortage`}>
							Item List Shortage
						</BreadcrumbItem>
						<BreadcrumbItem href={`/${currentUser}/inventory/item-list-shortage`}>
							Edit Item
						</BreadcrumbItem>
					</Breadcrumbs>
				</div>
				<div className="mt-7">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="max-w-[1200px] ps-6 2xl:ps-24 flex flex-col gap-5">
							<div className="flex flex-row gap-7">
								<Controller
									name="NAME"
									control={control}
									rules={{ required: "Item name is required" }}
									render={({ field, formState: { errors } }) => (
										<Input
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											isReadOnly={location.pathname.includes("info")}
											aria-label="title"
											isInvalid={!!errors.NAME}
											errorMessage={errors.NAME?.message}
											label={"Item Name"}
											placeholder={" "}
											type="text"
											variant="bordered"
											color="primary"
											radius="sm"
											size="lg"
											className="w-full"
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper:
													"rounded-lg h-full bg-[#e3ebf3] border-1 border-[#1D242E]",
												mainWrapper: "h-[4rem]",
											}}
											labelPlacement={"outside"}
										/>
									)}
								/>
							</div>
							<div className="flex flex-row gap-7">
								<Controller
									name="ITEM_GROUP"
									control={control}
									rules={{ required: "Time is required" }}
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
								<Controller
									name="QUANTITY"
									control={control}
									rules={{ required: "Quantity is required" }}
									render={({ field, formState: { errors } }) => (
										<Input
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											isReadOnly={location.pathname.includes("info")}
											aria-label="title"
											isInvalid={!!errors.QUANTITY}
											errorMessage={errors.QUANTITY?.message}
											label={"Quantity in number"}
											placeholder={" "}
											type="number"
											variant="bordered"
											color="primary"
											radius="sm"
											size="lg"
											className="w-full"
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper:
													"rounded-lg h-full bg-[#e3ebf3] border-1 border-[#1D242E]",
												mainWrapper: "h-[4rem]",
											}}
											labelPlacement={"outside"}
										/>
									)}
								/>
							</div>
							<Controller
								name="LOCATION"
								control={control}
								rules={{ required: "Location is required" }}
								render={({ field, formState: { errors } }) => (
									<Textarea
										value={field.value}
										onValueChange={(value) => {
											field.onChange(value);
										}}
										isReadOnly={location.pathname.includes("info")}
										aria-label="title"
										isInvalid={!!errors.LOCATION}
										errorMessage={errors.LOCATION?.message}
										placeholder={" "}
										type="text"
										variant={"bordered"}
										label="Location"
										radius="sm"
										size="lg"
										color="primary"
										className="col-span-12 mb-6 md:col-span-6 md:mb-0"
										classNames={{
											label: "text-darkText font-semibold text-base",
											inputWrapper:
												"rounded-lg h-full bg-[#e3ebf3] border-1 border-[#1D242E]",
											mainWrapper: "h-[4rem]",
										}}
										labelPlacement={"outside"}
									/>
								)}
							/>

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

export default EditItemShortage;
