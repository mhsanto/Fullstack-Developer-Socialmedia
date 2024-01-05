"use client ";
import { formUrlQuery } from "@/lib/utils";
import { Button } from "../ui/button";
import { useSearchParams ,useRouter} from "next/navigation";

type PaginationProps = {
  pageNumber: number;
  isNext: boolean;
};
const Pagination: React.FC<PaginationProps> = ({ pageNumber, isNext }) => {
    const searchParams = useSearchParams()
    const router = useRouter()
  const handleNavigation = (direction: string) => {
    const nextPageNumber =
      direction === "prev" ? pageNumber - 1 : pageNumber + 1;
      const newURL = formUrlQuery({
        params: searchParams.toString(),
        key: "page",	
        value: nextPageNumber.toString()
      })
      router.push(newURL)
  };
  if(!isNext && pageNumber === 1) return null
  return (
    <div className="flex w-full items-center justify-center gap-2">
      <Button
        disabled={pageNumber === 1}
        onClick={() => handleNavigation("prev")}
        className="light-border-2 btn flex  items-center justify-center gap-2 border"
      >
        Prev
      </Button>
      <div className="flex items-center justify-center rounded-md bg-primary-500/80 px-4 py-2">
        {pageNumber}
      </div>
      <Button
        disabled={!isNext}
        onClick={() => handleNavigation("next")}
        className="light-border-2 btn flex  items-center justify-center gap-2 border"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
