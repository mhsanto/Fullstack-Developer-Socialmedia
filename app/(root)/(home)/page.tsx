import LocalSearchBar from "@/components/search/local-searchbar";
import { Button } from "@/components/ui/button";
import { SearchCode } from "lucide-react";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <div className="dark:text-white w-full flex justify-between flex-col-reverse sm:flex-row sm:items-center">
        <h2 className="h2-bold">Hot Topics </h2>
        <Link
          href={`/ask-question`}
          className="bg-primary-500 dark:bg-primary-400
        hover:bg-primary-400/90
          transition-colors duration-200 
         fon-semibold flex items-center rounded-md max-sm:w-max self-end  justify-end text-slate-200"
        >
          <Button className="max-w-max">Ask a question</Button>
        </Link>
      </div>
      <div className="mt-10">
        <LocalSearchBar
          route="/"
          iconsPosition="left"
          searchIcons={<SearchCode className="dark:invert" />}
          placeholder="Search your questions"
          otherClasses=""
        />
      </div>
    </>
  );
};

export default Home;
