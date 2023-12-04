import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import Tags from "../tags";

const topQuestion = [
  {
    _id: 1,
    title: "What is the difference between a language and a framework?",
  },
  {
    _id: 2,
    title: "What is the difference between a language and a framework?",
  },
  {
    _id: 3,
    title: "What is the difference between a language and a framework?",
  },
  {
    _id: 4,
    title: "What is the difference between a language and a framework?",
  },
];
const topTags = [
  { _id: 1, tag: "javascript", questionCount: 100 },
  { _id: 2, tag: "React", questionCount: 32 },
  { _id: 4, tag: "Nextjs", questionCount: 30 },
  { _id: 5, tag: "Nodejs", questionCount: 22 },
];
const RightSidebar = () => {
  return (
    <div className="background-light800_darkgradient light-border custom-scrollbar text-dark300_light900 sticky right-0 top-0  flex flex-col items-start overflow-y-auto border-l p-6 max-lg:px-2 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden lg:w-[290px] ">
      <div>
        <h2 className="h2-bold ">Top Questions</h2>
        <div className="flex flex-col pt-5 gap-5 ">
          {topQuestion.map((question) => (
            <Link
              key={question._id}
              href={`/question/${question._id}`}
              className="flex justify-between items-end  w-full"
            >
              <p className="text-sm font-normal text-dark500_light700 hover:opacity-90">
                {question.title}
              </p>
              <ArrowRightIcon />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16 w-full">
        <h2 className="h2-bold ">Popular Tags</h2>
        <div className="flex w-full flex-col gap-4 pt-4">
          {topTags.map((tag) => (
            <Tags
              key={tag._id}
              _id={tag._id}
              questionCount={tag.questionCount}
              name={tag.tag}
              showCount
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
