"use client";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { SignedOut } from "@clerk/nextjs";
import { User, User2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const LeftSidebar = () => {
  const NavContent = () => {
    const pathname = usePathname();

    return (
      <section className="flex flex-col h-full gap-3.5 w-full">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              key={link.imgURL}
              href={link.route}
              className={cn(
                isActive
                  ? "bg-blue-500/80  rounded-lg "
                  : "bg-transparent ring-0",
                "flex items-center text-lg justify-start gap-3 py-2 ring-0 shadow-none  px-2.5 hover:ring-2 rounded-lg cursor-pointer "
              )}
            >
              <Image
                src={link.imgURL}
                width={20}
                height={20}
                alt={link.label}
              />
              <p
                className={cn(
                  "text-dark-100 dark:text-light-900 font-spaceGrotesk  text-lg max-lg:hidden ",
                  isActive ? "font-semibold " : "font-normal"
                )}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
      </section>
    );
  };
  return (
    <div className="background-light800_darkgradient light-border custom-scrollbar sticky h-screen left-0 top-0 flex flex-col justify-between overflow-y-auto border-r p-6 max-lg:px-2 pt-32 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px] items-center">
      <NavContent />

      <SignedOut>
        <div className="flex flex-col gap-3 w-full">
          <Link className="w-full" href="/sign-in">
            <Button
              className="small-medium 
              bg-blue-500/80 min-h-[41px] w-full rounded-lg  py-4 shadow-none hover:ring-1 "
            >
              <User size={20} className="dark:invert lg:hidden" />
              <span className=" text-sm base-normal max-lg:hidden dark:text-white ">
                Sign In
              </span>
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button
              className="small-medium 
            background-light800_dark400 light-border-2 btn-secondary  btn-tertiary dark:text-white
            lg:text-dark400_light900 min-h-[41px] w-full rounded-lg  py-4 shadow-none hover:ring-1 "
            >
              <User2Icon
                size={20}
                className="dark:invert opacity-60 lg:hidden"
              />
              <span className=" text-sm base-normal max-lg:hidden dark:text-white ">
                Sign up
              </span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </div>
  );
};

export default LeftSidebar;
