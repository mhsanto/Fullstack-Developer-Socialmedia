import { formatAndDivideNumber, getTimeStamp } from "@/lib/utils";
import { SignIn, SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import Metric from "../shared/metric";
import { Heart } from "lucide-react";
import EditDeleteAction from "../shared/edit-delete-action";

type AnswerCardProps = {
  clerkId?: string | null;
  _id: string;
  question: { _id: string; title: string };
  author: { _id: string; clerkId: string; name: string; picture: string };
  upvotes: number;
  createdAt: Date;
};

const AnswerCard: React.FC<AnswerCardProps> = ({
  clerkId,
  _id,
  question,
  author,
  upvotes,
  createdAt,
}) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <Link
      href={`/question/${question._id}/#${_id}`}
      className="flex items-start justify-start flex-col gap-7 dark:text-white background-light800_darkgradient p-5 border-b-1 shadow-sm dark:shadow-none rounded-lg mb-3 w-full"
    >
      <div className="flex-between w-full flex-wrap gap-3 items-center" >
        <Metric
          imgUrl={author.picture}
          alt="User Avatar"
          value={author.name}
          title={`asked at ${getTimeStamp(createdAt)}`}
          href={`/profile/${author.clerkId}`}
          textStyles="body-medium text-dark500_light700"
          isAuthor
        />
        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Answer" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row ">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {" "}
            {getTimeStamp(createdAt)}
          </span>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {question.title}
          </h3>
        </div>
        
      </div>
      <div className="flex-center gap-3">
          <Metric
            icon={<Heart size={20} />}
            alt="Like Icon"
            value={formatAndDivideNumber(upvotes)}
            title="Votes"
            textStyles="small-medium text-dark400_light800"
            isAuthor
          />
        </div>
    </Link>
  );
};

export default AnswerCard;
