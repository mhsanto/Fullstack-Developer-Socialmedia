import Metric from "@/components/metric";
import ParseHtml from "@/components/parse-html";
import { getQuestionById } from "@/lib/actions/question.action";
import { Clock, EyeIcon, Heart, LucideGitCommit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type QuestionPageProps = {
  params: {
    id: string;
  };
  searchParams: {
    id: string;
  };
};
const QuestionPage: React.FC<QuestionPageProps> = async ({
  params: { id },
  searchParams,
}) => {
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
              width={50}
              height={50}
              className="rounded-full"
            />
            <p className="paragraph-semibold ">{result.author.name}</p>
          </Link>
          <div className="flex justify-end">Voting</div>
        </div>
        <h2 className="h2-semibold mt-3.5 w-full text-left">{result.title}</h2>
      </div>
      <div className="flex mb-8 mt-5 flex-wrap gap-4 ">
        <Metric
          icon={<Clock size={20} />}
          value={`asked ${result.createdAt}`}
          title="Asked"
          textStyles="small-medium text-dark500_light700"
        />
        <Metric
          icon={<EyeIcon size={20} />}
          value={result.views}
          title=" Views"
          textStyles="small-medium text-dark500_light700"
        />
        <Metric
          icon={<LucideGitCommit size={20} />}
          value={result.answers.length}
          title=" Answers"
          textStyles="small-medium text-dark500_light700"
        />
      </div>
      <ParseHtml data={result.content} />
    </>
  );
};

export default QuestionPage;
