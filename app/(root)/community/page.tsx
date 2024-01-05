import UserCard from "@/components/card/user-card";
import SelectFilter from "@/components/filters/select-filter";
import NotFoundPage from "@/components/shared/not-found";
import LocalSearchBar from "@/components/search/local-searchbar";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import { SearchCode } from "lucide-react";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/pagination";

const Community = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllUsers({
    searchQuery: searchParams.value,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });
  <>
    <h1 className="h1-bold dark:text-white">Community </h1>

    <div className="mt-10 flex justify-between flex-col max-md:flex-row sm:items-start  gap-3 ">
      <LocalSearchBar
        route="/community"
        iconsPosition="left"
        searchIcons={<SearchCode className="dark:invert" />}
        placeholder="Search for a community member"
        otherClasses="flex-1"
      />
      <SelectFilter
        filters={UserFilters}
        otherClasses=""
        containerClasses="hidden max-md:flex"
      />
    </div>
    <section className="mt-12 flex flex-wrap gap-4">
      {result?.users.length && result.users.length > 0 ? (
        result?.users.map((user) => <UserCard key={user._id} user={user} />)
      ) : (
        <NotFoundPage
          href="/sign-up"
          linkText="Go to Sign-up"
          title="No Users Found"
          body="Become the First Member of this platform by creating an account"
        />
      )}
    </section>
    <div className="mt-10">
      <Pagination
        pageNumber={searchParams.page ? +searchParams.page : 1}
        isNext={result?.isNext || false}
      />
    </div>
  </>;
};

export default Community;
