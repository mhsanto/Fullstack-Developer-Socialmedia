import { getUserQuestion } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import QuestionCard from "../card/question-card";

interface QuestionTabProps extends SearchParamsProps {
    userId: string;
    clerkId: string ;
}
const QuestionTab: React.FC<QuestionTabProps> = async ({ searchParams, clerkId, userId }) => {
    const result = await getUserQuestion({
        userId,
        page: 1,
    })
    return (<>
    {result?.questions.map((question)=>(
         <QuestionCard
         key={question._id}
         _id={question._id}
         clerkId={clerkId}
         title={question.title}
         content={question.content}
         tags={question.tags}
         upvotes={question.upvotes}
         answers={question.answers}
         views={question.views}
         author={question.author}
         createdAt={question.createdAt}
       />
    ))}
    </>);
}

export default QuestionTab;