"use client";
import { cn, formatAndDivideNumber } from "@/lib/utils";
import {
  Bookmark,
  Heart,
  HeartCrack,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

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
  const handleSave = async () => {};
  const handleVote = async (action: string) => {};
  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1 5">
          <Heart
            className={cn(
              hasUpvoted ? "text-transparent fill-blue-500 " : "text-blue-500",
              "hover:fill-blue-500 hover:text-transparent",
              "cursor-pointer transition-colors duration-200"
            )}
            size={20}
            onClick={() => handleVote("upvote")}
          />

          <div className="flex-center  min-w-max rounded-sm p-1">
            <p>{formatAndDivideNumber(upvotes)}</p>
          </div>
        </div>
        <div className="flex-center gap-1 5">
          <HeartCrack
            fill={hasDownvoted ? "blue" : "transparent"}
            className={cn(
              hasDownvoted
                ? "text-blue-300 stroke-blue-300 stroke-2"
                : "text-blue-500",
              "hover:stroke-blue-600",
              "cursor-pointer transition-colors duration-200 "
            )}
            size={20}
            onClick={() => handleVote("downvote")}
          />

          <div className="flex-center  min-w-max rounded-sm p-1">
            <p>{formatAndDivideNumber(downvotes)}</p>
          </div>
        </div>
        <Bookmark
          className={cn(
            hasSaved ? "text-transparent fill-blue-500 " : "text-blue-500",
            "hover:fill-blue-600",
            "cursor-pointer transition-colors duration-200 "
          )}
          size={20}
          onClick={() => handleSave()}
        />
      </div>
    </div>
  );
};

export default Voting;
