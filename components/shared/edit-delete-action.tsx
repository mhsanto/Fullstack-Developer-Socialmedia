/* eslint-disable @next/next/no-async-client-component */
"use client";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import { DeleteIcon, Edit } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

type EditDeleteActionProps = {
  type: string;
  itemId: string;
};

const EditDeleteAction: React.FC<EditDeleteActionProps> = async ({
  type,
  itemId,
}) => {
  const path = usePathname();
  const router = useRouter();

  const handleEdit = async () => {
    router.push(`/question/edit/${JSON.parse(itemId)}}`);
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
      {type === "Question" && <Edit onClick={handleEdit} cursor="pointer" />}
      <DeleteIcon onClick={handleDelete} cursor="pointer" />
    </div>
  );
};

export default EditDeleteAction;
