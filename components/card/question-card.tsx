import { QuestionProps } from "@/types";
import { EyeIcon, Heart, LucideGitCommit } from "lucide-react";
import Link from "next/link";
import Tags from "../shared/tags";
import Metric from "../shared/metric";
import { getTimeStamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/edit-delete-action";

const QuestionCard: React.FC<QuestionProps> = ({
  _id,
  clerkId,
  title,
  content,
  tags,
  upvotes,
  answers,
  views,
  author,
  createdAt,
}) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;
  return (
    <div className="dark:text-white background-light800_darkgradient p-7 border-b-1 shadow-sm dark:shadow-none rounded-lg mb-4 w-full">
      <div className="flex flex-col">
        <div className="user_avatar flex  items-center justify-between gap-1.5 pb-5 w-full">
          <Metric
            imgUrl={author.picture}
            value={author.name}
            title={` asked-${getTimeStamp(createdAt)}`}
            href={`/profile/${author.name}`}
            isAuthor={true}
            textStyles="body-medium text-dark500_light700"
          />
          <SignedIn>
            {showActionButtons && (
              <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
            )}
          </SignedIn>
        </div>
        <div>
          <Link href={`/question/${_id}`} className="h3-bold pb-3">
            {title}
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-6 justify-between w-full">
       <div className="flex items-center gap-3">
       <Metric
          icon={<Heart size={20} />}
          value={upvotes.length}
          title=" Up Votes"
          textStyles="small-medium text-dark500_light700"
        />
        <Metric
          icon={<EyeIcon size={20} />}
          value={views}
          title=" Views"
          textStyles="small-medium text-dark500_light700"
        />
        <Metric
          icon={<LucideGitCommit size={20} />}
          value={answers}
          title=" Answers"
          textStyles="small-medium text-dark500_light700"
        />
       </div>
        <div className="flex items-center gap-2">
          {tags.map((tag) => (
            <Tags
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              variant="outline"
              customClasses="text-xs"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
