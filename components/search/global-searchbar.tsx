import { Input } from "../ui/input";
import { Search } from "lucide-react";
const GlobalSearchBar = () => {
  return (
    <div className="relative w-full max-w-xl max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Search size={30} className="dark:invert" />
        <Input
          className="border-none paragraph-regular placeholder
       no-focus 
       focus-visible:ring-offset-0 bg-transparent shadow-none outline-none"
          placeholder="search here"
          value=""
          type="text"
        />
      </div>
    </div>
  );
};

export default GlobalSearchBar;
