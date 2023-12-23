import NotFoundPage from "@/components/not-found";
import LocalSearchBar from "@/components/search/local-searchbar";
import { SearchCode } from "lucide-react";
import QuestionCard from "@/components/card/question-card";
import { getSavedQuestion } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

const Home = async () => {
  const { userId } = auth();
  if (!userId) return null;
  const result = await getSavedQuestion({clerkId:userId
  });

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
