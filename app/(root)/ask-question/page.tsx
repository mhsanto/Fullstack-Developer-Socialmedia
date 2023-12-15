import QuestionAskSection from "@/components/forms/question-ask-page";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

import { redirect } from "next/navigation";

const AskQuestion = async () => {
  const { userId } =  auth();
  if (!userId) redirect("/sign-in");
  const mongoUser = await getUserById({ userId });
  return (
    <div className="text-dark100_light900">
      <h2 className="h1-bold">Ask a question</h2>
      <div className="mt-9">
        <QuestionAskSection mongoUserId={JSON.stringify(mongoUser?._id)} />
      </div>
    </div>
  );
};
export default AskQuestion;
