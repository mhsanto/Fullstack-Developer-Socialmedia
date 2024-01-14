import { Skeleton } from "@/components/ui/skeleton";

const ProfileLoadingUi = () => {
  return (
    <>
      <div className="flex items-start justify-center sm:justify-between sm:flex-row dark:text-light-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 justify-center gap-1 xs:gap-4">
          <div className="flex gap-2 xs:gap-5 items-center sm:items-start flex-col xs:flex-row justify-center">
            <Skeleton className="w-52 aspect-square rounded-full flex-shrink-0" />
            <div className="mt-4 xs:mt-7 text-center xs:text-start">
              <div className=" flex flex-col gap-3 mb-3">
                <Skeleton className="h-6 w-40 " />
                <Skeleton className="h-6 w-32 " />
                <Skeleton className="h-6 w-40 " />
              </div>
            </div>
          </div>
          <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3 w-full">
            <Skeleton className="h-12 w-full sm:w-40 " />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Skeleton className="h-7 w-40" />
        <div className="flex gap-3 flex-wrap mt-7 justify-center">
          <Skeleton className="h-44 w-44 rounded-2xl flex-grow" />
          <Skeleton className="h-44 w-44 rounded-2xl flex-grow " />
          <Skeleton className="h-44 w-44 rounded-2xl flex-grow " />
          <Skeleton className="h-44 w-44 rounded-2xl flex-grow" />
        </div>
      </div>
      <div className="space-y-4 mt-4">
        <Skeleton className="h-12 w-44" />

        <div className="flex flex-col gap-4">
          {Array(3)
            .fill(1)
            .map((_, i) => (
              <Skeleton key={i} className="h-48  w-full rounded-2xl" />
            ))}
        </div>
      </div>
    </>
  );
};

export default ProfileLoadingUi;
