"use client";
import { DeleteIcon, Edit } from "lucide-react";

type EditDeleteActionProps = {
  type: string;
  itemId: string;
};

const EditDeleteAction: React.FC<EditDeleteActionProps> = ({
  type,
  itemId,
}) => {
  const handleEdit = () => {
    console.log("Edit");
  };
  const handleDelete = () => {
    if (type === "Question") {
      console.log("Delete Question");
    } else if (type === "Answer") {
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
