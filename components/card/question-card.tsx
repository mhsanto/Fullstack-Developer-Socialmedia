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
  // const showActionButtons = clerkId && clerkId === author._id
  return (
    <>
      <div className="dark:text-white background-light800_darkgradient p-7 border-b-1 mb-2 shadow-md dark:shadow-none rounded-lg">
        <div className="user_avatar flex  items-center gap-1.5 pb-5">
          <Metric
            imgUrl={author.picture}
            value={author.name}
            title={` asked-${getTimeStamp(createdAt)}`}
            href={`/profile/${author.name}`}
            isAuthor={true}
            textStyles="body-medium text-dark500_light700"
          />
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
        <Link href={`/question/${_id}`} className="flex flex-col">
          <h3 className="h3-bold pb-3">{title}</h3>
        </Link>
      </div>
      <SignedIn>{ <EditDeleteAction />}</SignedIn>
      <div className="flex gap-3 w-full pt-6">
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
    </>
  );
};

export default QuestionCard;
