import { getTopInteractedTagsParams } from "@/lib/actions/tag.action";
import Image from "next/image";
import Link from "next/link";
import Tags from "../shared/tags";
import { Badge } from "../ui/badge";

type UserCardProps = {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  };
};
const UserCard: React.FC<UserCardProps> = async ({ user }) => {
  const interactedTags = await getTopInteractedTagsParams({ userId: user._id });
  return (
    <article className="relative isolate flex flex-col justify-end items-center overflow-hidden rounded-2xl px-5 pb-8 pt-40 max-w-sm w-[190px] mt-7">
      <Image
        src={user.picture}
        alt={user.name}
        fill
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
      <h3 className="z-10 mt-3 text-2xl font-bold text-white max-w-sm line-clamp-1">
        {user.name}
      </h3>
      <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
        @{user.username}
      </div>
      <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
        {interactedTags?.length && interactedTags.length > 0 ? (
          <div className="flex items-center gap-2 mt-3">
            {interactedTags.map((tag) => (
              <Tags
                variant="default"
                key={tag._id}
                _id={tag._id}
                name={tag.tag}
                customClasses="bg-primary-500/80 text-light-900"
              />
            ))}
          </div>
        ) : (
          <Badge>No tags by this user</Badge>
        )}
      </div>
    </article>
  );
};

export default UserCard;
