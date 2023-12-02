"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const NavContent = () => {
  const pathname = usePathname();

  return (
    <section className="flex flex-col h-full gap-2 pt-16 pb-4">
      {sidebarLinks.map((link) => {
        const isActive =
          (pathname.includes(link.route) && link.route.length > 1) ||
          pathname === link.route;
        return (
          <SheetClose
            asChild
            key={link.imgURL}
            className={cn(
              isActive
                ? "bg-blue-500/70 text-light-900  rounded-lg hover:ring-0 font-semibold "
                : "text-dark300_light900 bg-transparent",
              "  flex items-center justify-start gap-3  py-3 px-3 hover:ring-2 rounded-lg "
            )}
          >
            <Link href={link.route} className="">
              <Image
                src={link.imgURL}
                width={20}
                height={20}
                alt={link.label}
                className="cursor-pointer"
              />
              <p className="text-dark-100 dark:text-light-900 font-spaceGrotesk text-sm font-bold">
                {link.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};
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
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <Link href="/" className="flex items-center gap-1">
          <p className="h2-bold font-spaceGrotesk text-dark-100 tracking-tighter dark:text-light-900 ">
            SANTO
            <span className="text-primary-500">as</span>
            DEV
          </p>
        </Link>
        <div>
          <SheetClose asChild>
            <NavContent />
          </SheetClose>
          <SignedOut>
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-4 shadow-none">
                    <span className="primary-text-gradient ">Sign In</span>
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-4 shadow-none">
                    <span className="primary-text-gradient ">Sign up</span>
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
