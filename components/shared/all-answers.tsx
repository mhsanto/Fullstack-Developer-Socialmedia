import { AnswerFilters } from "@/constants/filters";
import SelectFilter from "../filters/select-filter";
import { getAllAnswers } from "@/lib/actions/answer.action";
import Link from "next/link";
import Image from "next/image";
import { getTimeStamp } from "@/lib/utils";
import ParseHtml from "./parse-html";
import Voting from "./voting";
import Pagination from "./pagination";

type AllAnswersProps = {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: string;
  filter?: string;
};
const AllAnswers: React.FC<AllAnswersProps> = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}) => {
  const result = await getAllAnswers({
    questionId,
    page: page ? +page : 1,
    sortBy: filter,
  });
  return (
    <div className="mt-11">
   
      <div className=" items-center justify-between grid grid-cols-1 sm:grid-cols-2 gap-3">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        <SelectFilter
          filters={AnswerFilters}
          otherClasses="min-h-[50px] sm:min-w-[200px]"
        />
      </div>
      <div>
        {result?.answers.map((answer) => (
          <article key={answer._id} className="light-border border-b py-10">
            <div className="flex items-center justify-between">
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2 dark:text-light-900ss">
                <Link
                  href={`/profile/${answer.author.clerkId}`}
                  className="flex flex-1 items-start gap-1 sm:items-center"
                >
                  <Image
                    src={answer.author.picture}
                    alt={answer.author.name}
                    width={25}
                    height={25}
                    className="rounded-full object-cover max-sm:mt-0.5"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700">
                      {answer.author.name}
                    </p>
                    <p className="small-regular text-light-400_light500 mt-0.5 line-clamp-1 ml-0.5">
                      <span className="max-sm:hidden">- </span>answered{" "}
                      {getTimeStamp(answer.createdAt)}
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end">
                  <Voting
                    type="Answer"
                    itemId={JSON.stringify(answer._id)}
                    userId={JSON.stringify(userId)}
                    upvotes={answer.upvotes.length}
                    hasUpvoted={answer.upvotes.includes(userId)}
                    downvotes={answer.downvotes.length}
                    hasDownvoted={answer.downvotes.includes(userId)}
                  />
                </div>
              </div>
            </div>
            <ParseHtml data={answer.content} />
          </article>
        ))}
      </div>
      <div className="mt-10">
        <Pagination
          pageNumber={page ? +page : 1}
          isNext={result?.isNext || false}
        />
      </div>
    </div>
  );
};

export default AllAnswers;
