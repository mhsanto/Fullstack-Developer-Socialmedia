import SelectFilter from "@/components/filters/select-filter";
import NotFoundPage from "@/components/not-found";
import Question from "@/components/card/question";
import LocalSearchBar from "@/components/search/local-searchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { SearchCode } from "lucide-react";
import Link from "next/link";
const questions = [
  {
    _id: 1,
    question: "How to use react-query?",
    tags: [
      { _id: 1, name: "react" },
      { _id: 2, name: "react-query" },
    ],
    upvotes: 10,
    answers: 2,
    views: 10,
    author: { _id: 101, authorName: "John Doe" },
    createdAt: new Date('2023-01-01T12:00:00'),
  },
  {
    _id: 2,
    question: "How to use CLSX in Tailwind",
    tags: [
      { _id: 2, name: "tailwind" },
      { _id: 2, name: "clsx" },
    ],
    upvotes: 10,
    answers: 2,
    views: 10,
    author: { _id: 101, authorName: "John Doe" },
    createdAt: new Date('2023-01-01T12:00:00'),
  },
  {
    _id: 3,
    question: "How to use react-router-dom?",
    tags: [
      { _id: 3, name: "react" },
      { _id: 2, name: "react-router-dom" },
    ],
    upvotes: 10,
    answers: 2,
    views: 10,
    author: { _id: 101, authorName: "John Doe" },
    createdAt: new Date('2023-01-01T12:00:00'),
  },
];

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
      <div className="mt-10 flex items-center gap-3 ">
        <LocalSearchBar
          route="/"
          iconsPosition="left"
          searchIcons={<SearchCode className="dark:invert" />}
          placeholder="Search your questions"
          otherClasses=""
        />
        <SelectFilter
          filters={HomePageFilters}
          otherClasses=""
          containerClasses=""
        />
      </div>
      <div className="w-full mt-8">
        {questions.length > 0 ? (
          questions.map((question) => (
            <Question
              key={question._id}
              _id={question._id}
              question={question.question}
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
            href="ask-question"
            title="No Questions to show"
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
