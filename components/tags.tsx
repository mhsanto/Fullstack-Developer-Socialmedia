import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TagsProps = {
  _id: number;
  name: string;
  variant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | null
    | undefined;
  questionCount?: number;
  showCount?: boolean;
  customClasses?: string;
};
const Tags: React.FC<TagsProps> = ({
  _id,
  name,
  questionCount,
  showCount,
  variant,
  customClasses,
}) => {
  return (
    <Link
      href={`/tags/${_id}`}
      className="flex justify-between items-center w-full group"
    >
      <Badge
        variant={variant}
        className={cn("  whitespace-nowrap", customClasses)}
      >
        {name}
      </Badge>
      {showCount && (
        <span className="text-xs group-hover:font-semibold">
          {questionCount}
        </span>
      )}
    </Link>
  );
};

export default Tags;
