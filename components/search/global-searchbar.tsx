"use client";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import ShowGlobalResult from "./show-global-result";
const GlobalSearchBar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchContainerRef = useRef(null);
  const query = searchParams.get("value");
  const [search, setSearch] = useState(query || "");
  const [isOpen, setIsOpen] = useState(false);

  //this useEffect is used to handle click outside the search bar
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        // @ts-ignore
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };
    setIsOpen(false);
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [pathName]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newURL = formUrlQuery({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });
        router.push(newURL, { scroll: false });
      } else {
        if (query) {
          const newURL = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["global", "type"],
          });
          router.push(newURL, { scroll: false });
        }
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, router, query, pathName, searchParams]);
  return (
    <div
      className="relative w-full max-w-xl max-lg:hidden"
      ref={searchContainerRef}
    >
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Search size={30} className="dark:invert" />
        <Input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
            if (e.target.value === "" && isOpen) setIsOpen(false);
          }}
          className="border-none paragraph-regular placeholder
       no-focus text-dark400_light700
       focus-visible:ring-offset-0 bg-transparent shadow-none outline-none"
          placeholder="search here"
          type="text"
        />
      </div>
      {isOpen && <ShowGlobalResult />}
    </div>
  );
};

export default GlobalSearchBar;
