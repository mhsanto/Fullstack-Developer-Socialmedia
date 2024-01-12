import AllAnswers from "@/components/shared/all-answers";
import AnswerForm from "@/components/forms/answer-form";
import Metric from "@/components/shared/metric";
import ParseHtml from "@/components/shared/parse-html";
import Tags from "@/components/shared/tags";
import Voting from "@/components/shared/voting";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { Clock, EyeIcon, Heart, LucideGitCommit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata({ params }: Props) {
  const result = await getQuestionById({ questionId: params.id });

  return {
    title: `${result.title} | Developer Medium`,
    description: result.content,
  };
}

type QuestionPageProps = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | undefined };
};
const QuestionPage: React.FC<QuestionPageProps> = async ({
  params: { id },
  searchParams,
}) => {
  const { userId: clerkId } = auth();

  let mongoUser;
  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }
  const result = await getQuestionById({ questionId: id });
  return (
    <>
      <div className="w-full flex flex-col dark:text-light-900">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${result.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={result.author.picture}
              alt={result.author.name}
              width={25}
              height={25}
              className="rounded-full"
            />
            <p className="paragraph-semibold ">{result.author.name}</p>
          </Link>
          <div className="flex justify-end">
            <Voting
              type="Question"
              itemId={JSON.stringify(result._id)}
              userId={JSON.stringify(mongoUser._id)}
              upvotes={result.upvotes.length}
              hasUpvoted={result.upvotes.includes(mongoUser._id)}
              downvotes={result.downvotes.length}
              hasDownvoted={result.downvotes.includes(mongoUser._id)}
              hasSaved={mongoUser?.saved.includes(result._id)}
            />
          </div>
        </div>
        <h2 className="h2-semibold mt-3.5 w-full text-left">{result.title}</h2>
      </div>
      <div className="flex mb-8 mt-5 flex-wrap gap-4 ">
        <Metric
          icon={<Clock size={16} className="dark:invert" />}
          value={`asked ${result.createdAt}`}
          title="Asked"
          textStyles="small-medium text-dark500_light700"
        />
        <Metric
          icon={<EyeIcon size={16} className="dark:invert" />}
          value={result.views}
          title=" Views"
          textStyles="small-medium text-dark500_light700"
        />
        <Metric
          icon={<LucideGitCommit size={16} className="dark:invert" />}
          value={result.answers.length}
          title=" Answers"
          textStyles="small-medium text-dark500_light700"
        />
      </div>
      <ParseHtml data={result.content} />
      <div className="flex w-fit gap-4">
        {result.tags.map((tag: any) => (
          <Tags
            variant="outline"
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
            customClasses="dark:text-light-900  text-sm"
          />
        ))}
      </div>
      <AllAnswers
        questionId={result._id}
        userId={mongoUser._id}
        totalAnswers={result.answers.length}
        page={searchParams?.page}
        filter={searchParams?.filter}
      />

      <AnswerForm
        question={result.content}
        questionId={JSON.stringify(result._id)}
        authorId={JSON.stringify(mongoUser._id)}
      />
    </>
  );
};

export default QuestionPage;
