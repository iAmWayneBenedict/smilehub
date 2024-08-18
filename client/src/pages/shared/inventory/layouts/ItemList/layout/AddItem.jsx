import {
	Breadcrumbs,
	BreadcrumbItem,
	Input,
	Select,
	SelectItem,
	Textarea,
	Button,
} from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

const AddItem = () => {
	const location = useLocation();
	const currentUser = location.pathname.includes("admin") ? "admin" : "staff";
	// Form hook
	const {
		register,
		handleSubmit,
		control,
		setError,
		formState: { errors },
	} = useForm({
		defaultValues: {
			ITEM_NAME: "",
			ITEM_ID: "",
			ITEM_GROUP: "",
			QUANTITY_IN_NUMBER: null,
			LOCATION: "",
			USAGE_HISTORY: "",
		},
	});
	const onSubmit = (event) => console.log(event);
	return (
		<div style={{ flex: 1 }} className="">
			<div style={{ flex: 1 }} className="relative p-4 bg-white">
				<div className="p-5 font-darkText">
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
						<div className="max-w-[1200px] ps-6 2xl:ps-24 flex flex-col gap-5">
							<div className="flex flex-row gap-7">
								<Input
									{...register("ITEM_NAME", {
										required: "Item Name is required",
									})}
									isInvalid={!!errors.ITEM_NAME}
									errorMessage={errors.ITEM_NAME?.message}
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
										mainWrapper: "h-[4rem]",
									}}
									placeholder=" "
									labelPlacement={"outside"}
								/>
								<Input
									{...register("ITEM_ID", {
										required: "Item ID is required",
									})}
									isInvalid={!!errors.ITEM_ID}
									errorMessage={errors.ITEM_ID?.message}
									type="text"
									label="Item ID"
									size="lg"
									variant="bordered"
									color="primary"
									className="w-full"
									classNames={{
										label: "text-darkText font-semibold ",
										inputWrapper:
											"rounded-lg h-full bg-[#e3ebf3] border-1 border-[#1D242E]",
										mainWrapper: "h-[4rem]",
									}}
									placeholder=" "
									labelPlacement={"outside"}
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
											placeholder="Select Time"
											label="Time of Visit"
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
											{[""].map((item) => (
												<SelectItem key={item} value={item}>
													{item === "" ? "- Select Group -" : item}
												</SelectItem>
											))}
										</Select>
									)}
								/>
								<Input
									{...register("QUANTITY_IN_NUMBER", {
										required: "Quantity is required",
									})}
									isInvalid={!!errors.QUANTITY_IN_NUMBER}
									errorMessage={errors.QUANTITY_IN_NUMBER?.message}
									type="text"
									label="Quantity in number"
									size="lg"
									variant="bordered"
									color="primary"
									className="w-full"
									classNames={{
										label: "text-darkText font-semibold ",
										inputWrapper:
											"rounded-lg h-full bg-[#e3ebf3] border-1 border-[#1D242E]",
										mainWrapper: "h-[4rem]",
									}}
									placeholder=" "
									labelPlacement={"outside"}
								/>
							</div>
							<Textarea
								{...register("LOCATION", {
									required: "Location is required",
								})}
								isInvalid={!!errors.LOCATION}
								errorMessage={errors.LOCATION?.message}
								variant={"bordered"}
								label="Location"
								radius="sm"
								size="lg"
								color="primary"
								labelPlacement="outside"
								classNames={{
									label: "text-darkText font-semibold text-base",
									inputWrapper:
										"rounded-lg h-full bg-[#e3ebf3] border-1 border-[#1D242E]",
									mainWrapper: "h-[4rem]",
								}}
								placeholder=" "
								className="col-span-12 mb-6 md:col-span-6 md:mb-0"
							/>
							<Textarea
								{...register("USAGE_HISTORY", {
									required: "Usage History is required",
								})}
								isInvalid={!!errors.USAGE_HISTORY}
								errorMessage={errors.USAGE_HISTORY?.message}
								variant={"bordered"}
								label="Usage History"
								radius="sm"
								size="lg"
								color="primary"
								labelPlacement="outside"
								classNames={{
									label: "text-darkText font-semibold text-base",
									inputWrapper:
										"rounded-lg h-full bg-[#e3ebf3] border-1 border-[#1D242E]",
									mainWrapper: "h-[4rem]",
								}}
								placeholder=" "
								className="col-span-12 mb-6 md:col-span-6 md:mb-0"
							/>
							<div>
								<Button color="primary" className="px-8 text-base">
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
