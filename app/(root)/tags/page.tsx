import SelectFilter from "@/components/filters/select-filter";
import NotFoundPage from "@/components/shared/not-found";
import LocalSearchBar from "@/components/search/local-searchbar";
import Tags from "@/components/shared/tags";
import { TagFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.action";
import { SearchCode } from "lucide-react";
import Link from "next/link";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/pagination";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Question | Developer Medium",
  description:
    "A social media platform for developers.where you share your ideas and thoughts with other developers.Speak what's in your mind no need to worry about what others will think about it",
};
const TagsPage = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllTags({
    searchQuery: searchParams.value,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <>
      <h1 className="h1-bold dark:text-white">Tags</h1>

      <div className="mt-10 flex justify-between flex-col max-md:flex-row sm:items-start  gap-3 flex-wrap">
        <LocalSearchBar
          route="/tags"
          iconsPosition="left"
          searchIcons={<SearchCode className="dark:invert" />}
          placeholder="Search for Tags..."
          otherClasses=""
        />
        <SelectFilter
          filters={TagFilters}
          otherClasses=""
          containerClasses="hidden max-md:flex"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {result?.tags.length && result.tags.length > 0 ? (
          result?.tags.map((tag) => (
            <Link
              href={`/tags/${tag._id}`}
              key={tag._id}
              className="dark:text-light-900"
            >
              <Tags
                _id={tag._id}
                name={tag.name}
                variant="outline"
                customClasses="bg-primary-500/80 text-xl px-4"
              />
            </Link>
          ))
        ) : (
          <NotFoundPage
            href="/ask-question"
            linkText="Go To Ask Question Page"
            title="No Tags found at this moment"
            body="Create a new tag by asking a question first"
          />
        )}
      </section>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams.page ? +searchParams.page : 1}
          isNext={result?.isNext || false}
        />
      </div>
    </>
  );
};

export default TagsPage;
