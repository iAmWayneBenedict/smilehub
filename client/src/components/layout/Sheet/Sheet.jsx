import logoText from "../../../assets/icons/SMILEHUB.png";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Image, Link, Button } from "@nextui-org/react";
import SideNav from "../shared/sideNav";
import { Menu } from "lucide-react";

export function CustomSheet() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					className="min-w-0 border-1 sheet-trigger-side-nav"
					variant="bordered"
					radius="sm"
				>
					<Menu size={24} />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="w-[20rem] min-w-[20rem]">
				<SheetHeader>
					<SheetTitle>
						<div className="">
							<Link href={"/"}>
								<Image src={logoText} removeWrapper className="rounded-none" />
							</Link>
						</div>
					</SheetTitle>
				</SheetHeader>
				<div className="flex flex-col h-[calc(100%-36px)] overflow-y-scroll custom-scrollbar">
					<SideNav isCustom={true} />
				</div>
			</SheetContent>
		</Sheet>
	);
}
