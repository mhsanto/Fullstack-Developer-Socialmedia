import { AnswerFilters } from "@/constants/filters";
import SelectFilter from "./filters/select-filter";
import { getAllAnswers } from "@/lib/actions/answer.action";
import Link from "next/link";
import Image from "next/image";
import { getTimeStamp } from "@/lib/utils";
import ParseHtml from "./parse-html";
import Voting from "./voting";

type AllAnswersProps = {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;

  filter?: number;
};
const AllAnswers: React.FC<AllAnswersProps> = async ({
  questionId,
  userId,
  totalAnswers, 
  page,
  filter,
}) => {
  const result = await getAllAnswers({ questionId });
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="text-blue-500">{totalAnswers} Answers</h3>
        <SelectFilter filters={AnswerFilters} />
      </div>
      <div>
        {result?.answers.map((answer) => (
          <article key={answer._id} className="light-border border-b py-10">
            <div className="flex items-center justify-between">
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
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
                  <Voting />
                </div>
              </div>
            </div>
            <ParseHtml data={answer.content} />
          </article>
        ))}
      </div>
    </div>
  );
};

export default AllAnswers;
