import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="flex flex-between background-light900 dark200 fixed z-50 w0full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        SANTO
        <p className="h2-bold font-space_Grotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          <span className="text-primary-500">asDEV</span>
        </p>
      </Link>
      Global Seach
      <div className="flex-between gap-5">
        theme
        <SignedIn>
            <UserButton afterSignOutUrl="/" appearance={{
                elements:{
                    avatarBox:'h-10 w-10'
                },variables:{
                    colorPrimary:"#0000ff"
                }
            }}/>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
