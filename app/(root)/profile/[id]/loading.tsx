import { Skeleton } from "@/components/ui/skeleton";

const ProfileLoadingUi = () => {
  return (
    <section>
      <Skeleton className="w-52 aspect-square rounded-full"/>
      <div className="mt-10  mb-6 flex flex-wrap gap-5 ">
        <Skeleton className="h-12 flex-1   " />
      </div>
      <div className="flex mb-10 gap-4">
        <Skeleton className=" h-10 w-36 " />
        <Skeleton className=" h-10 w-36 " />
        <Skeleton className=" h-10 w-36 " />
        <Skeleton className=" h-10 w-36 " />
      </div>
      <div className="flex flex-col gap-4">
        {Array(6)
          .fill(1)
          .map((_, i) => (
            <Skeleton key={i} className="h-48  w-full rounded-2xl" />
          ))}
      </div>
    </section>
  );
};

export default ProfileLoadingUi;
