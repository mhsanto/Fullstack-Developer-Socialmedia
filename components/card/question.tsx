import { QuestionProps } from "@/types";
import { EyeIcon, Heart, LucideGitCommit, User } from "lucide-react";
import Link from "next/link";
import Tags from "../tags";
import Metric from "../metric";
import { getTimeStamp } from "@/lib/utils";

const Question: React.FC<QuestionProps> = ({
  _id,
  question,
  tags,
  upvotes,
  answers,
  views,
  author,
  createdAt,
}) => {
  return (
    <div className="dark:text-white background-light800_darkgradient p-7 border-b-1 mb-2 shadow-md dark:shadow-none rounded-lg">
      <div className="user_avatar flex  items-center gap-1.5 pb-5">
        <Metric
          icon={<User size={20} />}
          value={author.authorName}
          title={` asked-${getTimeStamp(createdAt)}`}
          href={`/profile/${author.authorName}`}
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
        <h3 className="h3-bold pb-3">{question}</h3>
        <p className="text-sm text-dark500_light700">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum fugit
          aliquid nulla, amet delectus hic praesentium explicabo tenetur dolor!
          Culpa, expedita? Sunt vel soluta dicta explicabo necessitatibus esse,
          repudiandae illo.
        </p>
      </Link>
      <div className="flex gap-3 w-full pt-6">
        <Metric
          icon={<Heart size={20} />}
          value={upvotes}
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
    </div>
  );
};

export default Question;
