import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import ThemeSwitcher from "./theme-switcher";
import MobileNav from "./mobile-nav";
import GlobalSearchBar from "../search/global-searchbar";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1 max-sm:text-sm">
        <p className="h2-bold font-spaceGrotesk text-dark-100 tracking-tighter dark:text-light-900 max-sm:text-sm">
          SANTO
          <span className="text-primary-500 max-sm:text-sm">as</span>
          DEV
        </p>
      </Link>
      {/* //Global Search Bar */}
      <GlobalSearchBar />
      <div className="flex-between gap-5">
        <ThemeSwitcher />
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
