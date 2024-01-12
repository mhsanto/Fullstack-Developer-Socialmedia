import QuestionAskSection from "@/components/forms/question-ask-form";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";

import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Ask Question | Developer Medium",
  description:
    "A social media platform for developers.where you share your ideas and thoughts with other developers.Speak what's in your mind no need to worry about what others will think about it",
};
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
