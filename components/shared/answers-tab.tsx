import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import AnswerCard from "../card/answer-card";

interface AnswersTabProps extends SearchParamsProps {
  userId: string;
  clerkId: string;
}
const AnswersTab: React.FC<AnswersTabProps> = async ({
  searchParams,
  clerkId,
  userId,
}) => {
  const result = await getUserAnswers({
    userId,
    page: 1,
  });
  return (
    <>
      {result?.answers.map((item) => (
        <AnswerCard
          clerkId={clerkId}
          _id={item._id}
          question={item.question}
          author={item.author}
          upvotes={item.upvotes.length}
          createdAt={item.createdAt}
          key={item._id}
        />
      ))}
    </>
  );
};

export default AnswersTab;
