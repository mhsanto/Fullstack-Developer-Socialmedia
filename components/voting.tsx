"use client";
import {
  downVoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { cn, formatAndDivideNumber } from "@/lib/utils";
import {
  Bookmark,
  Heart,
  HeartCrack,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

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
  const path = usePathname();
  const router = useRouter();
  const handleSave = async () => {};
  const handleVote = async (action: string) => {
    if (!userId) return;

    if (action === "upvotes") {
      if (type === "Question") {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path
        });
      } else if (type === "Answer") {
        // await upvoteAnswers({
        //   answerId: JSON.parse(itemId),
        //   userId: JSON.parse(userId),
        //   hasupVoted,
        //   hasdownVoted,
        //   path: pathname,
        // });
      }

      // return toast({
      //   title: `Upvote ${!hasUpvoted ? "Successful" : "Removed"}`,
      //   variant: !hasupVoted ? "default" : "destructive",
      // });
    }

    if (action === "downvotes") {
      if (type === "Question") {
        await downVoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path,
        });
      } else if (type === "Answer") {
        // await downvoteAnswers({
        //   answerId: JSON.parse(itemId),
        //   userId: JSON.parse(userId),
        //   hasupVoted,
        //   hasdownVoted,
        //   path: pathname,
        // });
      }

      // return toast({
      //   title: `Downvote ${!hasdownVoted ? "Successful" : "Removed"}`,
      //   variant: !hasupVoted ? "default" : "destructive",
      // });
    }
  };
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
            onClick={() => handleVote("upvotes")}
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
            onClick={() => handleVote("downvotes")}
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
