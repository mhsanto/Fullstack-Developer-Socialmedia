import SelectFilter from "@/components/filters/select-filter";
import NotFoundPage from "@/components/not-found";
import LocalSearchBar from "@/components/search/local-searchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { SearchCode } from "lucide-react";
import Link from "next/link";
import { getQuestions } from "@/lib/actions/question.action";
import QuestionCard from "@/components/card/question-card";

const Home = async () => {
  const result = await getQuestions({});
  return (
    <>
      <div className="dark:text-white w-full flex justify-between flex-col-reverse sm:flex-row sm:items-center">
        <h2 className="h2-bold">Saved Questions</h2>
       
      </div>
      <div className="mt-10 flex items-center gap-3 ">
        <LocalSearchBar
          route="/"
          iconsPosition="left"
          searchIcons={<SearchCode className="dark:invert" />}
          placeholder="Search your questions"
          otherClasses=""
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
                answers={question.answers}
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
