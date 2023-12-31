"use client";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import { CloudCog, Edit, Trash } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

type EditDeleteActionProps = {
  type: string;
  itemId: string;
};

const EditDeleteAction: React.FC<EditDeleteActionProps> = ({
  type,
  itemId,
}) => {
  const path = usePathname();
  const router = useRouter();
  const itemIdIs = JSON.parse(itemId)
  console.log(JSON.parse(itemId));
  const handleEdit = async () => {
    router.push(`/question/edit/${itemIdIs}`);
  };

  const handleDelete = async () => {
    if (type === "Question") {
      await deleteQuestion({ questionId: JSON.parse(itemId), path });
    } else if (type === "Answer") {
      await deleteAnswer({ answerId: JSON.parse(itemId), path });
    }
  };
  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === "Question" && (
        <Edit size={15} onClick={handleEdit} cursor="pointer" />
      )}
      <Trash onClick={handleDelete} size={15} cursor="pointer" />
    </div>
  );
};

export default EditDeleteAction;
