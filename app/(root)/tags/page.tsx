import SelectFilter from "@/components/filters/select-filter";
import NotFoundPage from "@/components/shared/not-found";
import LocalSearchBar from "@/components/search/local-searchbar";
import Tags from "@/components/shared/tags";
import { UserFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.action";
import { SearchCode } from "lucide-react";
import Link from "next/link";
import { SearchParamsProps } from "@/types";

const TagsPage = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllTags({ searchQuery: searchParams.value });
  return (
    <>
      <h1 className="h1-bold dark:text-white">Tags</h1>

      <div className="mt-10 flex justify-between flex-col max-md:flex-row sm:items-start  gap-3 ">
        <LocalSearchBar
          route="/tags"
          iconsPosition="left"
          searchIcons={<SearchCode className="dark:invert" />}
          placeholder="Search for Tags..."
          otherClasses=""
        />
        <SelectFilter
          filters={UserFilters}
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
    </>
  );
};

export default TagsPage;
