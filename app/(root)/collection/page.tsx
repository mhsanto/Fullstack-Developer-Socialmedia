import NotFoundPage from "@/components/shared/not-found";
import LocalSearchBar from "@/components/search/local-searchbar";
import { SearchCode } from "lucide-react";
import QuestionCard from "@/components/card/question-card";
import { getSavedQuestion } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { SearchParamsProps } from "@/types";
import SelectFilter from "@/components/filters/select-filter";
import { QuestionFilters } from "@/constants/filters";
import Pagination from "@/components/shared/pagination";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Collection | Developer Medium",
  description:
    "A social media platform for developers.where you share your ideas and thoughts with other developers.Speak what's in your mind no need to worry about what others will think about it",
};
const Home = async ({ searchParams }: SearchParamsProps) => {
  const { userId } = auth();
  if (!userId) return null;
  const result = await getSavedQuestion({
    clerkId: userId,
    searchQuery: searchParams.value,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <>
      <div className="dark:text-white w-full flex justify-between flex-col-reverse sm:flex-row sm:items-center">
        <h2 className="h2-bold">Saved Questions</h2>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center mb-4">
        <LocalSearchBar
          route="/"
          iconsPosition="left"
          searchIcons={<SearchCode className="dark:invert" />}
          placeholder="Search your questions"
          otherClasses="flex-1 w-full"
        />
        <SelectFilter
          filters={QuestionFilters}
          otherClasses="min-h-[50px] sm:min-w-[190px]"
        />
      </div>
      <div className="w-full mt-8">
        {result?.questions?.length ? (
          result.questions?.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              content={question.content}
              tags={question.tags}
              upvotes={question.upvotes}
              answers={question.answers.length}
              views={question.views}
              author={question.author}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NotFoundPage
            href="/ask-question"
            title="No saved questions to show"
            body="Be the first one to create a Question.Break the silence with your presence."
            linkText="Ask a question"
          />
        )}
      </div>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams.page ? +searchParams.page : 1}
          isNext={result?.isNext || false}
        />
      </div>
    </>
  );
};

export default Home;
