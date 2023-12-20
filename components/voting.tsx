import { formatAndDivideNumber } from "@/lib/utils";
import { ThumbsUp } from "lucide-react";

type VotingProps = {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasUpvoted: boolean;
  downvotes: number;
  hasDownvoted: boolean;
  hasSaved?: boolean;
};
const Voting: React.FC<VotingProps> = ({
  type,
  itemId,
  userId,
  upvotes,
  hasUpvoted,
  downvotes,
  hasDownvoted,
  hasSaved,
}) => {
  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1 5">
          {hasUpvoted ? (
            <>
              <ThumbsUp fill="#fff" size={16} cursor="true" />
            </>
          ) : (
            <ThumbsUp size={16} cursor="true" />
          )}
          <div className="flex-center background-light700_dark400 min-w-[18px]rounded-sm p-1">
            <p>{/* {formatAndDivideNumber(upvotes)} */}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voting;
