"use client";
import { HomePageFilters } from "@/constants/filters";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

const HomeFilters = () => {
  const searchParams = useSearchParams();
  const [active, setActive] = useState("");

  const router = useRouter();
  const query = searchParams.get("value");

  const handleClicked = (value: string) => {
    if (active === value) {
      setActive("");
      const newURL = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });
      router.push(newURL, { scroll: false });
    } else {
      setActive(value);
      const newURL = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: value.toLowerCase(),
      });
      router.push(newURL, { scroll: false });
    }
  };
  return (
    <div className="mt-2 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => handleClicked(filter.value)}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none  ${
            active === filter.value
              ? "bg-primary-500/80 font-semibold text-light-900"
              : " background-light800_darkgradient  dark:text-light-900"
          }`}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
