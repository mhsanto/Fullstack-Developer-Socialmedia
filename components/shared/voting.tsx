"use client";
import { downVoteAnswer, upVoteAnswer } from "@/lib/actions/answer.action";
import { createInteraction } from "@/lib/actions/interaction.action";
import {
  downVoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { toggleSavedQuestion } from "@/lib/actions/user.action";
import { cn, formatAndDivideNumber } from "@/lib/utils";
import { Bookmark, Heart, HeartCrack } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "../ui/use-toast";

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
  const handleSave = async () => {
    await toggleSavedQuestion({
      questionId: JSON.parse(itemId),
      userId: JSON.parse(userId),
      path,
    });
    return toast({
      title: `Question ${
        !hasSaved ? " added to collection successfully" : "Removed from collection"
      }`,
      variant: !hasSaved ? "default" : "destructive",
    });
  };
  const handleVote = async (action: string) => {
    if (!userId) {
      return toast({
        title: "Please Sign in using Sign in button",
        description: "You must be logged in user to use this feature",
      });
    }

    if (action === "upvotes") {
      if (type === "Question") {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path,
        });
        return toast({
          title: `Upvoted  ${
            !hasUpvoted ? "Question Successfully" : "Removed"
          }`,
          variant: !hasUpvoted ? "default" : "destructive",
        });
      } else if (type === "Answer") {
        await upVoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path,
        });
        return toast({
          title: !hasUpvoted ? "Upvoted Answer Successful" : "Upvote Removed",
          variant: !hasUpvoted ? "default" : "destructive",
        });
      }
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
        return toast({
          title: !hasUpvoted
            ? "Downvoted Question Successful"
            : "Downvote Removed",
          variant: !hasUpvoted ? "default" : "destructive",
        });
      } else if (type === "Answer") {
        await downVoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path,
        });
        return toast({
          title: !hasUpvoted
            ? "Downvoted Answer Successful"
            : "Downvote Removed",
          variant: !hasUpvoted ? "default" : "destructive",
        });
      }
    }
  };
  useEffect(() => {
    createInteraction({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    });
  }, [itemId, userId, path, router]);
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

          <div className="flex-center min-w-max rounded-sm p-1">
            <p className="dark:text-white">{formatAndDivideNumber(upvotes)}</p>
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
            <p className="dark:text-white">
              {formatAndDivideNumber(downvotes)}
            </p>
          </div>
        </div>
        {type === "Question" && (
          <Bookmark
            className={cn(
              hasSaved ? "text-transparent fill-blue-500 " : "text-blue-500",
              "hover:fill-blue-600",
              "cursor-pointer transition-colors duration-200 "
            )}
            size={20}
            onClick={() => handleSave()}
          />
        )}
      </div>
    </div>
  );
};

export default Voting;
