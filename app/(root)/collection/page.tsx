import NotFoundPage from "@/components/shared/not-found";
import LocalSearchBar from "@/components/search/local-searchbar";
import { SearchCode } from "lucide-react";
import QuestionCard from "@/components/card/question-card";
import { getSavedQuestion } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { SearchParamsProps } from "@/types";
import SelectFilter from "@/components/filters/select-filter";
import { QuestionFilters } from "@/constants/filters";

const Home = async ({ searchParams }: SearchParamsProps) => {
  const { userId } = auth();
  if (!userId) return null;
  const result = await getSavedQuestion({
    clerkId: userId,
    searchQuery: searchParams.value,
    filter: searchParams.filter,
  });

  return (
    <>
      <div className="dark:text-white w-full flex justify-between flex-col-reverse sm:flex-row sm:items-center">
        <h2 className="h2-bold">Saved Questions</h2>
      </div>
      <div className="mt-10 flex items-center gap-3 justify-between max-sm:flex-col sm:items-center ">
        <LocalSearchBar
          route="/"
          iconsPosition="left"
          searchIcons={<SearchCode className="dark:invert" />}
          placeholder="Search your questions"
          otherClasses="flex-1"
        />
        <SelectFilter filters={QuestionFilters} otherClasses="" />
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
      {/* filters by user selection */}
    </>
  );
};

export default Home;
