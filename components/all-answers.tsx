import { AnswerFilters } from "@/constants/filters";
import SelectFilter from "./filters/select-filter";
import { getAllAnswers } from "@/lib/actions/answer.action";

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
            <div className="flex items-center justify-between"></div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default AllAnswers;
