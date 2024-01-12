"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, formUrlQuery } from "@/lib/utils";
import HomeFilters from "./home-filters";
import { useRouter, useSearchParams } from "next/navigation";

type SelectFilterProps = {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
};
const SelectFilter: React.FC<SelectFilterProps> = ({
  filters,
  otherClasses,
  containerClasses,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paramFilter = searchParams.get("filter");
  function handleUpdateParams(value: string) {
    const newURL = formUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value,
    });
    router.push(newURL, { scroll: false });
  }
  return (
    <>
      <div className={cn("relative w-full ", containerClasses)}>
        <Select
          onValueChange={(value) => handleUpdateParams(value)}
          defaultValue={paramFilter || undefined}
          >
          <SelectTrigger
            className={cn(
              "min-w-[180px] body-regular light-border background-light800_dark300 text-dark500_light700 border px-5  flex-1 ",
              otherClasses
            )}
          >
            <div className="line-clamp-1 flex-1 text-left py-4">
              <SelectValue placeholder="Select your favourite" />
            </div>
          </SelectTrigger>
          <SelectContent className="background-light800_dark300 text-dark500_light700 border-none">
            <SelectGroup>
              {filters.map((filter) => (
                <SelectItem
                  key={filter.value}
                  value={filter.value}
                  className="hover:background-light800_dark400 cursor-pointer"
                >
                  {filter.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <HomeFilters />
    </>
  );
};

export default SelectFilter;
