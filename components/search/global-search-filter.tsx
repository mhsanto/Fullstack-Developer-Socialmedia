"use client";
import { GlobalSearchFilters as SearchFilters } from "@/constants/filters";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
const GlobalSearchFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParams = searchParams.get("type");
  const [active, setActive] = useState(typeParams || "");
  const handleType = (type: string) => {
    if (active === type) {
      setActive("");
      const newURL = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: null,
      });
      router.push(newURL, { scroll: false });
    } else {
      setActive(type);
      const newURL = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: type.toLowerCase(),
      });
      router.push(newURL, { scroll: false });
    }
  };

  return (
    <div className="flex items-center gap-5 px-5">
      <p className="text-dark400_light900 body-medium">Type:</p>
      <div className="flex gap-3">
        {SearchFilters.map((item) => (
          <button
            key={item.value}
            type="button"
            className={`light-border-2 small-medium dark:text-light-900 rounded-2xl px-5 py-2 capitalize  ${
              active === item.value
                ? "bg-primary-500/80  text-light-900 font-semibold"
                : " text-dark-400 hover-text-blue-500 ring-2 dark:hover:text-primary-500/80"
            }`}
            onClick={() => handleType(item.value)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GlobalSearchFilters;
