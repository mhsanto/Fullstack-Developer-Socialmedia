import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type TagsProps = {
  _id: number;
  name: string;
  questionCount?: number;
  showCount?: boolean;
};
const Tags: React.FC<TagsProps> = ({ _id, name, questionCount, showCount }) => {
  return (
    <Link href={`/tags/${_id}`} className="flex justify-between w-full group">
      <Badge variant="default" className="py-1 bg-primary-500/50
      dark:bg-primary-500/30 hover:bg-primary-500/40  ">
        {name}
      </Badge>
      {showCount && (
        <span className="text-xs group-hover:font-semibold">{questionCount}</span>
      )}
    </Link>
  );
};

export default Tags;
