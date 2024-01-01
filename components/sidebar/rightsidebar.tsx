import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import Tags from "../shared/tags";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getPopularTags } from "@/lib/actions/tag.action";


const RightSidebar = async () => {
  const hotQuestions = await getHotQuestions();
  const topTags = await getPopularTags()

  return (
    <div className="background-light800_darkgradient light-border custom-scrollbar text-dark300_light900 sticky right-0 top-0  flex flex-col items-start overflow-y-auto border-l p-6 max-lg:px-2 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden lg:w-[290px] ">
      <div>
        <h2 className="h2-bold ">Top Questions</h2>
        <div className="flex flex-col pt-5 gap-5 ">
          {hotQuestions?.map((question) => (
            <Link
              key={question._id}
              href={`/question/${question._id}`}
              className="flex justify-between items-end  w-full"
            >
              <p className="text-sm font-normal dark:text-light-900 hover:opacity-90">
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
          {topTags?.map((tag) => (
            <Tags
              variant="default"
              customClasses="bg-primary-500/50
              dark:bg-primary-500/80 hover:bg-primary-500/40 py-1"
              key={tag._id}
              _id={tag._id}
              questionCount={tag.numberOfQuestions}
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
