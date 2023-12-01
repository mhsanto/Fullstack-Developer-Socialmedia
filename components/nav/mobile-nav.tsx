import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          width={20}
          height={20}
          alt="Menu"
        />
      </SheetTrigger>
      <SheetContent side="left" className="background-light900_dark200 border-none">
      <Link href="/" className="flex items-center gap-1">
        <p className="h2-bold font-spaceGrotesk text-dark-100 tracking-tighter dark:text-light-900 ">
          SANTO
          <span className="text-primary-500">as</span>
          DEV
        </p>
      </Link>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
