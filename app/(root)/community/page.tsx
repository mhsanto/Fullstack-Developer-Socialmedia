import UserCard from "@/components/card/user-card";
import SelectFilter from "@/components/filters/select-filter";
import NotFoundPage from "@/components/not-found";
import LocalSearchBar from "@/components/search/local-searchbar";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import { SearchCode } from "lucide-react";
import Image from "next/image";

const Community = async () => {
  const result = await getAllUsers({});
  return (
    <>
      <h1 className="h1-bold dark:text-white">Community </h1>

      <div className="mt-10 flex items-center gap-3 ">
        <LocalSearchBar
          route="/community"
          iconsPosition="left"
          searchIcons={<SearchCode className="dark:invert" />}
          placeholder="Search for a community member"
          otherClasses=""
        />
        <SelectFilter
          filters={UserFilters}
          otherClasses=""
          containerClasses=""
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
    </>
  );
};

export default Community;
