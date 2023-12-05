import { QuestionProps } from "@/types";
import { User } from "lucide-react";
import Link from "next/link";
import Tags from "../tags";

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
        <div className="bg-primary-400 rounded-full h-5 w-5 flex items-center justify-center">
          <User size={20} />
        </div>
        <div className="flex gap-1 items-center ">
          <h4 className="text-sm"> {author.authorName}</h4>
          <span className="text-xs tracking-tighter pr-2"> {createdAt}</span>
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
      <Link href={`/question/${_id}`} className="flex flex-col">
        <h3 className="h3-bold pb-3">{question}</h3>
        <p className="text-sm text-dark500_light700">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum fugit
          aliquid nulla, amet delectus hic praesentium explicabo tenetur dolor!
          Culpa, expedita? Sunt vel soluta dicta explicabo necessitatibus esse,
          repudiandae illo.
        </p>
      </Link>
    </div>
  );
};

export default Question;
