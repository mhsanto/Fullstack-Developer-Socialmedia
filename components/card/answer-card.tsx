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
      className="card-wrapper rounded-sm px-11 py-8"
    >
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
        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
        <div className="flex-between mt-6 w-full flex-wrap gap-3">
          <Metric
            imgUrl={author.picture}
            alt="User Avatar"
            value={author.name}
            title={`asked at ${getTimeStamp(createdAt)}`}
            href={`/profile/${author.clerkId}`}
            textStyles="body-medium text-dark500_light700"
            isAuthor
          />
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
        </div>
      </div>
    </Link>
  );
};

export default AnswerCard;
