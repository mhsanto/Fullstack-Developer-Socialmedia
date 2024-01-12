import SelectFilter from "@/components/filters/select-filter";
import NotFoundPage from "@/components/shared/not-found";
import LocalSearchBar from "@/components/search/local-searchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { SearchCode } from "lucide-react";
import Link from "next/link";
import { getQuestions } from "@/lib/actions/question.action";
import QuestionCard from "@/components/card/question-card";

import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/pagination";
import { Metadata } from "next";

export const metaData: Metadata = {
  title: "Home | Developer Medium",
  description:
    "A social media platform for developers.where you share your ideas and thoughts with other developers.Speak what's in your mind no need to worry about what others will think about it",
};
const Home = async ({ searchParams }: SearchParamsProps) => {
  const result = await getQuestions({
    searchQuery: searchParams?.value,
    filter: searchParams?.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  //fetch reccomended questions
  return (
    <>
      <div className="dark:text-white w-full flex justify-between flex-col-reverse sm:flex-row sm:items-center">
        <h2 className="h2-bold">Hot Topics</h2>
        <Link
          href={`/ask-question`}
          className="bg-primary-500/80
        hover:bg-primary-400/90
          transition-colors duration-200 
         fon-semibold flex items-center rounded-md max-sm:w-max self-end  justify-end "
        >
          <Button className="max-w-max text-light-900 text-base">
            Ask a question
          </Button>
        </Link>
      </div>
      <div className="mt-10 flex justify-between flex-col max-md:flex-row max-md:flex-wrap sm:items-start  gap-3 ">
        <LocalSearchBar
          route="/"
          iconsPosition="left"
          searchIcons={<SearchCode className="dark:invert" />}
          placeholder="Search your questions"
          otherClasses="flex-1 "
        />
        <SelectFilter
          filters={HomePageFilters}
          otherClasses=""
          containerClasses="hidden max-md:flex"
        />
      </div>
      <div className="w-full mt-8">
        {result?.questions?.length ? (
          result.questions?.map((question) => (
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
            href="ask-question"
            title="No Questions to show"
            body="Be the first one to create a Question.Break the silence with your presence."
            linkText="Ask a question"
          />
        )}
      </div>
      {/* filters by user selection */}
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
