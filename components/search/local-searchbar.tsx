"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { cn, formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useEffect, useState } from "react";
type LocalSearchBarProps = {
  route: string;
  iconsPosition: string;
  placeholder: string;
  otherClasses?: string;
  searchIcons: React.ReactNode;
};
const LocalSearchBar: React.FC<LocalSearchBarProps> = ({
  iconsPosition,
  placeholder,
  route,
  searchIcons,
  otherClasses,
}) => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("value");
  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newURL = formUrlQuery({
          params: searchParams.toString(),
          key: "value",
          value: search,
        });
        router.push(newURL, { scroll: false });
      }else{
        if(pathName === route){
            const newURL = removeKeysFromQuery({
              params:searchParams.toString(),
              keysToRemove:["value"]
            })
        router.push(newURL, { scroll: false });

        }
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, route,router, query, pathName, searchParams]);
  return (
    <div
      className="flex items-center
      gap-2 background-light800_darkgradient px-3 py-1  h-full w-full rounded-lg"
    >
      {iconsPosition === "left" && searchIcons}
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={cn(
          "focus-visible:ring-0 bg-transparent        focus:outline-none focus:border-none placeholder focus-visible:ring-offset-0  border-0  rounded-lg text-dark-500 dark:text-white",
          otherClasses
        )}
        placeholder={placeholder}
      />
      {iconsPosition === "right" && searchIcons}
    </div>
  );
};

export default LocalSearchBar;
