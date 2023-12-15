import Image from "next/image";
import Link from "next/link";

type UserCardProps = {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  };
};
const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Link href={`/profile/${user.clerkId}`}>
      <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto mt-24">
        <Image
          src={user.picture}
          alt={user.name}
          fill
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
        <h3 className="z-10 mt-3 text-xl font-bold text-white line-clamp-1">{user.name}</h3>
        <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
          @{user.username}
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
