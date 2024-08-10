import { DatePicker, Radio, ButtonGroup, Button, cn } from "@nextui-org/react";
import { startOfWeek, startOfMonth, getLocalTimeZone, today } from "@internationalized/date";
import { useLocale, useDateFormatter } from "@react-aria/i18n";
import PropTypes from "prop-types";
import { useEffect } from "react";

export default function CustomDatePicker({
	value,
	setValue,
	label,
	showTimeSelect = true,
	classNames,
	minValue = null,
	isDateUnavailable = null,
	onChange = null,
	...props
}) {
	let defaultDate = today(getLocalTimeZone());

	useEffect(() => {
		setValue(defaultDate);
	}, []);

	let { locale } = useLocale();
	let formatter = useDateFormatter({ dateStyle: "full" });

	let now = today(getLocalTimeZone());
	let nextWeek = startOfWeek(now.add({ weeks: 1 }), locale);
	let nextMonth = startOfMonth(now.add({ months: 1 }));

	const CustomRadio = (props) => {
		const { children, ...otherProps } = props;

		return (
			<Radio
				{...otherProps}
				classNames={{
					base: cn(
						"flex-none m-0 h-8 bg-content1 hover:bg-content2 items-center justify-between",
						"cursor-pointer rounded-full border-2 border-default-200/60",
						"data-[selected=true]:border-primary"
					),
					label: cn("text-tiny text-default-500"),
					labelWrapper: cn("flex items-center justify-center"),
					wrapper: cn("hidden"),
				}}
			>
				{children}
			</Radio>
		);
	};
	CustomRadio.propTypes = {
		children: PropTypes.node,
	};

	return (
		<div className="flex flex-col w-full gap-2">
			<DatePicker
				CalendarTopContent={
					<ButtonGroup
						fullWidth
						className="px-3 pb-2 pt-3 bg-content1 [&>button]:text-default-500 [&>button]:border-default-200/60"
						radius="full"
						size="sm"
						variant="bordered"
					>
						<Button onPress={() => setValue(now)}>Today</Button>
						<Button onPress={() => setValue(nextWeek)}>Next week</Button>
						<Button onPress={() => setValue(nextMonth)}>Next month</Button>
					</ButtonGroup>
				}
				calendarProps={{
					focusedValue: value,
					onFocusChange: setValue,
					nextButtonProps: {
						variant: "bordered",
					},
					prevButtonProps: {
						variant: "bordered",
					},
				}}
				{...props}
				showMonthAndYearPickers
				value={value}
				onChange={(e) => {
					setValue(e);
					onChange && onChange(e);
				}}
				label={label === undefined ? "Select a date" : label}
				labelPlacement={"outside"}
				size="lg"
				variant="bordered"
				color="primary"
				className="w-full "
				minValue={minValue}
				isDateUnavailable={isDateUnavailable}
				dateInputClassNames={{
					label: cn("text-darkText font-semibold ", classNames?.label),
					inputWrapper: cn("rounded-lg h-full bg-white", classNames?.inputWrapper),
					innerWrapper: cn("h-[4rem]", classNames?.innerWrapper),
				}}
			/>
			{showTimeSelect && (
				<p className="text-xs text-default-500">
					Selected date:{" "}
					{value ? formatter.format(value.toDate(getLocalTimeZone())) : "--"}
				</p>
			)}
		</div>
	);
}
CustomDatePicker.propTypes = {
	value: PropTypes.any,
	setValue: PropTypes.func,
	props: PropTypes.any,
	label: PropTypes.string,
	showTimeSelect: PropTypes.bool,
	minValue: PropTypes.any,
	isDateUnavailable: PropTypes.any,
	classNames: PropTypes.object,
	onChange: PropTypes.func,
};
